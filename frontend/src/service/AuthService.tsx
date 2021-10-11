import { AuthEmit, AuthEvent } from "../enums/AuthEnums";
import { ConfirmationDto } from "./dto/ConfirmationDto";
import { CreateUserDto } from "./dto/CreateUserDto";
import { LoginUserDto } from "./dto/LoginUserDto";
import { ResetPasswordDto } from "./dto/ResetPasswordDto";
import { ResetDto } from "./dto/ResetDto";
import { UseSocketInterface } from "../hooks/useSocket";

export class AuthService{
    constructor(
        private ioClient : UseSocketInterface
    ){}


    public createUser( dto : CreateUserDto, listener : ( ...args : any[] ) => void  )
    {
        this.baseService( AuthEmit.REGISTRATION , AuthEvent.REGISTERED , dto  , listener );
    }

    public loginUser( dto : LoginUserDto , listener : ( ...args : any[] ) => void )
    {
        this.baseService( AuthEmit.LOGIN , AuthEvent.LOGED , dto  , listener );
    }

    public resetUser( dto : ResetDto , listener : ( ...args : any[] ) => void )
    {
        this.baseService( AuthEmit.RESET  , AuthEvent.RESETED , dto , listener )
    }

    public checkConfirmationCode( dto : ConfirmationDto , listener : ( ...args : any[] ) => void ){
        this.baseService( AuthEmit.CONFIRMATION  , AuthEvent.CONFIRMED , dto , listener )
    }



    private baseService( 
        emitString : string , 
        eventString : string , 
        dto : CreateUserDto | LoginUserDto | ConfirmationDto | ResetPasswordDto | ResetDto  ,
        listener : ( ...args : any[] ) => void
        )
    {

        this.ioClient.emit( emitString , { ...dto } );
        this.ioClient.on( eventString , listener );
    }

}