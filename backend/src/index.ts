import express , {Request , Response , Express } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection, getRepository } from 'typeorm';

import validator from 'validator';
import { User } from './entity/User';

const PORT = 5000;


const app : Express = express();

app.use( cors() );
app.use( helmet() );
app.use( express.json() );


const server : http.Server = http.createServer(app);
const io : socketio.Server = new socketio.Server(server , {
    cors: { origin: ['http://localhost:3000'], credentials: true },
  });

enum EmitStrings{
    EMAIL_VALIDATED = 'emailValidated',
    PASSWORD_VALIDATED = 'passwordValidated',
    USERNAME_VALIDATED = 'usernameValidated'
}

enum EventStrings{
    VALIDATE_EMAIL = 'validateEmail',
    VALIDATE_PASSWORD = 'validatePassword',
    VALIDATE_USERNAME = 'validateUsername'
}

enum ErrorStrings{
    
    INVALID_EMAIL = 'Invalid Email',
    EMAIL_ALREADY_USE = "E-Mail already in use",

    INVALID_USERNAME = "Invalid Username",
    USERNAME_ALREADY_USE = "Username alreadu in use",

    INVALID_PASSWORD = "Invalid Password",
    PASSWORDS_DIFFERENT = "Password are different",
    SHORT_PASSWORD = "Password is to short",
    WEAK_PASSOWRD = "Password is weak"

}

// Validating Values
io.on('connect' , async ( socket : socketio.Socket ) => {

    const userRepository = getRepository( User );

    socket.on(EventStrings.VALIDATE_EMAIL ,  async ( email : string  ) => {

        const errors : string[] = [];

        if( !validator.isEmail(email) )
        {
            errors.push( ErrorStrings.INVALID_EMAIL);
        }

        if ( await userRepository.count( { email } ) )
        {
            errors.push(ErrorStrings.EMAIL_ALREADY_USE   );
        }

        socket.emit( EmitStrings.EMAIL_VALIDATED , errors.length ? { error : errors } : {} );
        
    });


    socket.on( EventStrings.VALIDATE_USERNAME , async ( username : string ) => {
        
        const errors : string[] = [];

        if ( username.length === 0 || username.length > 255)
        {
            errors.push(ErrorStrings.INVALID_USERNAME );
        }
        
        if( await userRepository.count( { username } ) )
        {
            errors.push( ErrorStrings.USERNAME_ALREADY_USE  );
        }
        
        socket.emit( EmitStrings.USERNAME_VALIDATED , errors.length ? { error : errors } : {} );

    } );

    interface PasswordInterface{ password : string , confPassword : string }
    socket.on( EventStrings.VALIDATE_PASSWORD , async( { password , confPassword } : PasswordInterface ) =>{
        const errors : string[] =  [];
        
        if( password !== confPassword ){ errors.push( ErrorStrings.PASSWORDS_DIFFERENT ); }
        if( password.length < 8 ){ errors.push( ErrorStrings.SHORT_PASSWORD ) }
        if( !( /\d/.test( password ) && /\w/.test( password )  ) && password.length >=  8  ){ errors.push( ErrorStrings.WEAK_PASSOWRD ) }

        socket.emit( EmitStrings.PASSWORD_VALIDATED , errors.length ? { error : errors } : {} );

    })


})

createConnection().then(() => server.listen( PORT ));

