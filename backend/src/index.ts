import express , {Request , Response , Express } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';

import validator from 'validator';

const PORT = 5000;


const app : Express = express();

app.use( cors() );
app.use( helmet() );
app.use( express.json() );


const server : http.Server = http.createServer(app);
const io : socketio.Server = new socketio.Server(server , {
    cors: { origin: ['http://localhost:3000'], credentials: true },
  });



io.on('connect' , ( socket : socketio.Socket ) => {
    socket.on('login' , ( client : socketio.Socket ) => {
        console.log(client);
    });

    socket.on('checkEmail' , ( email : string  ) => {
        if( validator.isEmail(email) ){
            socket.emit('emailChecked' , {})
        }else
        {
            socket.emit('emailChecked' ,  {error : 'Error : Invalid Email'})
        }
        
    })

    // socket.on('checkUsername' , ( email : string  ) => {
    //     if( validator.isEmail(email) ){
    //         socket.emit('emailChecked' , {})
    //     }else
    //     {
    //         socket.emit('emailChecked' ,  {error : 'Error'})
    //     }
        
    // })

})

server.listen( PORT );