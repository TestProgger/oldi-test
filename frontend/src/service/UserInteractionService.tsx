import { UIEmiter , UIEvent } from "../enums/UserInteractionEnum";
import { UseSocketInterface } from "../hooks/useSocket";
import { BaseService } from "./BaseService";
import { ChangeProfileImageDto } from "./dto/ChangeProfileImageDto";

export class UserInteractionService extends BaseService{
    constructor( 
        private io : UseSocketInterface
     ){ super(io)}

    public changeProfileImage( dto : ChangeProfileImageDto , listener : (...args:any[]) => void )
    {
        this.baseService( UIEmiter.CHANGE_PROFILE_IMAGE , UIEvent.PROFILE_IMAGE_CHANGE , dto , listener );
    }

    public getProfileImage( listener : (...args:any[]) => void )
    {
        this.baseService( UIEmiter.GET_PROFILE_IMAGE , UIEmiter.GET_PROFILE_IMAGE , {} , listener )
    }


    

}