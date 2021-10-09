import express , {Request , Response , Express } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import * as jwt from 'jsonwebtoken';
import { v5 as uuidv5 , v4 as uuidv4 } from 'uuid';
import { createConnection, getRepository } from 'typeorm';

import validator from 'validator';
import dotenv from 'dotenv'
import { User } from './entity/User';

import { ValidateEmit , ValidateError , ValidateEvent } from './enums/ValidateEnum';
import {  AuthEvent , AuthError, AuthEmiter } from './enums/AuthEnums';
import { AuthService, TokenInterface } from './services/AuthService';
import { CreateUserDto } from './services/dto/CreateUserDto';
import { LoginUserDto } from './services/dto/LoginUserDto';

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

interface SessionStorageInterface{
    key : Buffer,
    iv : Buffer,
    token : TokenInterface
}

const SessionStorage = new Map<string , SessionStorageInterface >()


// Validating Values
io.on('connect' , async ( socket : socketio.Socket ) => {

    const userRepository = getRepository( User );

    socket.on(ValidateEvent.VALIDATE_EMAIL ,  async ( email : string  ) => {

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


    socket.on( ValidateEvent.VALIDATE_USERNAME , async ( username : string ) => {
        
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
        if( !( /\d/.test( password ) && /\w/.test( password )  ) && password.length >=  8  ){ errors.push( ValidateError.WEAK_PASSOWRD ) }

        socket.emit( ValidateEmit.PASSWORD_VALIDATED , errors.length ? { error : errors } : {} );

    })


});

// 
io.on( 'connect' , async ( socket : socketio.Socket ) => {

    const authService = new AuthService();

    // await authService.createUser( { username : 'Mikhail' , password : '213213131' , email : "email@mail.ru" } );

    socket.on( AuthEvent.REGISTRATION ,  async ( dto : CreateUserDto ) => {
        const user = await authService.createUser(dto);
        if( user instanceof  User ){
            const token = await authService.createToken( user  , process.env.JWT_SECRET as string );
            socket.emit(AuthEmiter.REGISTERED , token);
        }else
        {
            socket.emit( AuthEmiter.LOGED , { error : AuthError.REGISTRATION_ALREADY_IN_USE } )
        }
        
        
    }  );

    socket.on( AuthEvent.LOGIN  , async ( dto : LoginUserDto ) => {
        const user = await authService.loginUser( dto );
        if ( user instanceof User )
        {
            const token = await authService.createToken( user , process.env.JWT_SECRET  as string  );
            socket.emit( AuthEmiter.LOGED , token );
        }
        else
        {
            socket.emit( AuthEmiter.LOGED , user );
        }
    })

});

createConnection().then(() => server.listen( PORT ));

