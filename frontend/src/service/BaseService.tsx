import { UseSocketInterface } from "../hooks/useSocket";
import { ConfirmationDto } from "./dto/ConfirmationDto";
import { CreateUserDto } from "./dto/CreateUserDto";
import { LoginUserDto } from "./dto/LoginUserDto";
import { ResetPasswordDto } from "./dto/ResetPasswordDto";
import { ResetDto } from "./dto/ResetDto";
import { ChangeProfileImageDto } from "./dto/ChangeProfileImageDto";


export class BaseService{
    constructor( 
        private ioClient : UseSocketInterface
    ){}



    protected baseService( 
        emitString : string , 
        eventString : string , 
        dto : CreateUserDto | LoginUserDto | ConfirmationDto | ResetPasswordDto | ResetDto | ChangeProfileImageDto | {}  ,
        listener : ( ...args : any[] ) => void
        )
    {

        this.ioClient.emit( emitString , { ...dto } );
        this.ioClient.on( eventString , listener );
    }
}