import express , {Request , Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
const PORT = 5000;

const server  = express();

// Middlewares
server.use( cors() );
server.use( helmet() );
server.use( express.json() );

// Public folder for static files
server.use('/public' , express.static('public'));


server.get( '/' , ( req : Request , res : Response ) =>  res.send('<h1> Hello World </h1>')  );

server.listen( PORT , () => { console.log('Started') } )