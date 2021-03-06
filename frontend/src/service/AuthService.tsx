import { AuthEmit, AuthEvent } from "../enums/AuthEnums";
import { ConfirmationDto } from "./dto/ConfirmationDto";
import { CreateUserDto } from "./dto/CreateUserDto";
import { LoginUserDto } from "./dto/LoginUserDto";
import { ResetPasswordDto } from "./dto/ResetPasswordDto";
import { ResetDto } from "./dto/ResetDto";
import { UseSocketInterface } from "../hooks/useSocket";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
    constructor(
        private  io : UseSocketInterface
    ){
        super( io );
    }


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

    public checkConfirmationCode( dto : ConfirmationDto , listener : ( ...args : any[] ) => void )
    {
        this.baseService( AuthEmit.CONFIRMATION  , AuthEvent.CONFIRMED , dto , listener )
    }

    public resetPassword( dto : ResetPasswordDto , listener : ( ...args : any[] ) => void )
    {
        this.baseService( AuthEmit.RESET_PASSWORD , AuthEvent.PASSWORD_RESETED , dto , listener );
    }

    public getRoles( listener : (...args:any[]) => void )
    {
        this.baseService( 'getRoles' , 'getRoles'  ,  {} , listener );
    }

}