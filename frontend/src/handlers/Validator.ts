import { Socket } from "socket.io-client";
import { ValidateEmit , ValidateEvent } from '../enums/ValidateEnum';


interface Response{
    error ?: string[]
}



export class Validator{

    constructor(
        private ioClient : Socket,
        private showAlert : ( alertStrings : string[]) => void,
        private hideAlert : () => void ,
        public isValid : boolean  = false
    ){}

    public validateEmail( email : string  )
    {
        this.validator( ValidateEmit.VALIDATE_EMAIL , ValidateEvent.EMAIL_VALIDATED , email );
    }

    public validateUsername( username : string )
    {
        this.validator( ValidateEmit.VALIDATE_USERNAME , ValidateEvent.USERNAME_VALIDATED , username );
    }

    public validatePassword( password : string , confPassword : string  )
    {
        this.validator( ValidateEmit.VALIDATE_PASSWORD , ValidateEvent.PASSWORD_VALIDATED , { password , confPassword } );
    }

    private validator( emitString : string  , eventString : string , value : any  )
    {
        this.ioClient.emit( emitString , value );
        this.ioClient.on( eventString , ( response : Response  ) => {
            this.isValid = !( response?.error );
            response?.error ? this.showAlert( response.error ) : this.hideAlert();
        } )
    }

}