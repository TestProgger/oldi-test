import express , {Request , Response , Express } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection, getRepository } from 'typeorm';

import validator from 'validator';
import dotenv from 'dotenv'
import { User } from './entity/User';

import { ValidateEmit , ValidateError , ValidateEvent } from './enums/ValidateEnum';
import {  AuthEvent , AuthError, AuthEmiter } from './enums/AuthEnums';
import { UserService, TokenInterface } from './services/UserService';
import { CreateUserDto } from './services/dto/CreateUserDto';
import { LoginUserDto } from './services/dto/LoginUserDto';
import { ConfirmationDto } from './services/dto/ConfirmationDto';
import { ResetPasswordDto } from './services/dto/ResetPasswordDto';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import {  TokenStoreService } from './services/TokenStoreService';
import { UserInteractionService } from './services/UserInteractionService';
import { UIEvent } from './enums/UserInteractionEnum';
import { Role } from './entity/Role';

const PORT = 5000;

dotenv.config();


const app : Express = express();

app.use( cors() );
app.use( helmet() );
app.use( express.json() );



const server : http.Server = http.createServer(app);
const io : socketio.Server = new socketio.Server(server , {
    cors: { origin: ['http://localhost:3000'], credentials: true },
  });


let userService: UserService;
let tokenStoreService : TokenStoreService;
let userInteractionService : UserInteractionService

// Validating Values
io.on('connect' , async ( socket : socketio.Socket ) => {

    const userRepository = getRepository( User );

    socket.on(ValidateEvent.VALIDATE_EMAIL ,  async ( { email }  ) => {

        const errors : string[] = [];

        if( !validator.isEmail(email) )
        {
            errors.push( ValidateError.INVALID_EMAIL);
        }

        if ( await userRepository.count( { where : { email }  } ) )
        {
            errors.push(ValidateError.EMAIL_ALREADY_USE   );
        }

        socket.emit( ValidateEmit.EMAIL_VALIDATED , errors.length ? { error : errors } : {} );
        
    });


    socket.on( ValidateEvent.VALIDATE_USERNAME , async ( { username }) => {
        
        const errors : string[] = [];

        if ( username.length === 0 || username.length > 255)
        {
            errors.push(ValidateError.INVALID_USERNAME );
        }
        
        if( await userRepository.count( { where :  { username }  } ) )
        {
            errors.push( ValidateError.USERNAME_ALREADY_USE  );
        }
        
        socket.emit( ValidateEmit.USERNAME_VALIDATED , errors.length ? { error : errors } : {} );

    } );

    interface PasswordInterface{ password : string , confPassword : string }
    socket.on( ValidateEvent.VALIDATE_PASSWORD , async( { password , confPassword } : PasswordInterface ) =>{
        const errors : string[] =  [];
        
        if( password !== confPassword ){ errors.push( ValidateError.PASSWORDS_DIFFERENT ); }
        if( password.length < 8 ){ errors.push( ValidateError.SHORT_PASSWORD ) }
        if( !( /\d/.test( password ) && /[A-Z]/gmi.test( password )  ) && password.length >=  8  ){ errors.push( ValidateError.WEAK_PASSOWRD ) }

        socket.emit( ValidateEmit.PASSWORD_VALIDATED , errors.length ? { error : errors } : {} );

    })


});

//

interface ResetUserValue{
    id : number 
    code : string 
}

io.on( 'connect' , async ( socket : socketio.Socket ) => {

    const resetUserDB = new Map<string , ResetUserValue>( );

    socket.on( AuthEvent.REGISTRATION ,  async ( dto : CreateUserDto ) => {
        const user = await userService.createUser(dto);
        if( user instanceof  User ){
            const token = await userService.createToken( user);
            await tokenStoreService.insertToken( token  , user.id );
            socket.emit(AuthEmiter.REGISTERED , token);
        }else
        {
            socket.emit( AuthEmiter.REGISTERED , { error : [ AuthError.REGISTRATION_ALREADY_IN_USE ] } )
        }
    }  );

    socket.on( AuthEvent.LOGIN  , async ( dto : LoginUserDto ) => {
        const data = await userService.loginUser( dto );
        if ( data instanceof User )
        {
            const token = await userService.createToken( data);
            await tokenStoreService.insertToken( token , data.id );
            socket.emit( AuthEmiter.LOGED , token );
        }
        else
        {
            socket.emit( AuthEmiter.LOGED , { error :  [ data ] } );
        }
    });

    socket.on( AuthEvent.RESET , async ( { username }  ) => {
        const user = await userService.getUserByUsername( username );
        if( user ){ 
            
            await tokenStoreService.deleteTokenByUserId(user.id);

            /// Code sended to E-Mail
            const code  = Math.floor(Math.random() * 100000000).toString().slice(0,6);
            console.log(`Reset Code : ${code}`); 


            const tmpToken = await userService.createTempToken(user);
            resetUserDB.set( tmpToken , {code , id : user.id }  );

            setTimeout(() => resetUserDB.delete( tmpToken ) , 5 * 60  * 1000) // After 2 minutes, the token will become invalid

            socket.emit( AuthEmiter.RESETED , tmpToken ); 
        }
        else{ socket.emit( AuthEmiter.RESETED , { error : [AuthError.LOGIN_IDENTITY_NOT_FOUND] } ) }
    } )

    socket.on( AuthEvent.CONFIRMATION , async ( { token , code } : ConfirmationDto ) => {
        try{
            const storedData = resetUserDB.get( token );
                if( storedData?.code === code )
                {
                    socket.emit( AuthEmiter.CONFIRMED , null )
                }else
                {
                    socket.emit( AuthEmiter.CONFIRMED , { error : [ AuthError.CONFIRM_INCORRECT_CODE ] } ); 
                }
        }
        catch( ex)
        {
            socket.emit( AuthEmiter.CONFIRMED , { error : [ AuthError.CONFIRM_INVALID_FORM ] } ); 
        }
        
    });

    socket.on( AuthEvent.RESET_PASSWORD , async ( { password , confPassword , token } : ResetPasswordDto ) => {
        try{
            const storedData = resetUserDB.get( token );
            if( password !== confPassword ){
                socket.emit( AuthEmiter.PASSWORD_RESETED , { error : [AuthError.RESET_PASSWORD_PASSWORDS_DIFFERENT] } );
            }else{
                if( storedData ){
                    await userService.changePassword( storedData?.id , password );
                    socket.emit( AuthEmiter.PASSWORD_RESETED , {} );
                    resetUserDB.delete(token);
                }
            }
        }catch(ex)
        {
            console.log(ex);
            socket.emit( AuthEmiter.PASSWORD_RESETED , {  error : [ AuthError.RESET_PASSWORD_INVALID_FORM ]} )
        }
    } );

    socket.on( AuthEvent.GET_ROLES , async () => {
        socket.emit( AuthEmiter.GET_ROLES , await userService.getRoles() );
    } )



});

io.on('connect' , ( socket : socketio.Socket ) => {
    socket.use( AuthMiddleware(process.env.JWT_SECRET as string , userService , tokenStoreService ) )
    .on(UIEvent.CHANGE_PROFILE_IMAGE , async ( { image , user } ) => { 
        await userInteractionService.changeProfileImage( image , user.id );
        socket.emit('profileImageChanged' , true); 
    })
    .on( UIEvent.GET_PROFILE_IMAGE , async( { user } ) => {
        const image = await userInteractionService.getProfileImage(user);
        socket.emit( UIEvent.GET_PROFILE_IMAGE  , image);
    } )
    .on( 'error' , err => {
        console.log(err);
        socket.emit(AuthEmiter.INAVLID_TOKEN , AuthError.INVALID_TOKEN);
    } );
}) 


createConnection().then((connection ) => {  
    server.listen( PORT );  
    userService = new UserService( process.env.JWT_SECRET as string ) ;
    tokenStoreService = new TokenStoreService();
    userInteractionService = new UserInteractionService();
} );

