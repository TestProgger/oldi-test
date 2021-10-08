import { Socket } from "socket.io-client";
import { EmitStrings , EventStrings } from './Events';


interface Response{
    error ?: string 
}



export class Validator{

    constructor(
        private ioClient : Socket,
        private showAlert : ( text : string ) => void,
        private hideAlert : () => void 
    ){}

    public validateEmail( email : string  )
    {
        this.validator( EmitStrings.VALIDATE_EMAIL , EventStrings.EMAIL_VALIDATED , email );
    }

    public validateUsername( username : string )
    {
        this.validator( EmitStrings.VALIDATE_USERNAME , EventStrings.USERNAME_VALIDATED , username );
    }

    public validatePassword( password : string , confPassword : string  )
    {
        this.validator( EmitStrings.VALIDATE_PASSWORD , EventStrings.PASSWORD_VALIDATED , { password , confPassword } );
    }

    private validator( emitString : string  , eventString : string , value : any  )
    {
        this.ioClient.emit( emitString , value );
        this.ioClient.on( eventString , ( response : Response  ) => {
            response?.error ? this.showAlert( response.error ) : this.hideAlert();
        } )
    }

}