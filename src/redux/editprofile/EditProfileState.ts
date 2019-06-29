import { User } from "./../../models/Auth";
import { Country } from "./../../models/Country";
import {PhoneCode} from "./../../models/PhoneCode"
export interface EditProfileState {
    user: User;
    countries:[Country];
    phonecodes:[PhoneCode];
	loading: boolean; 
	error: boolean;
    errorMessage: string;
    isCompleted:boolean;
    initStatus:{
        basic:boolean;
        location:boolean;
        social:boolean;
    };

    isBasicInfoSubmiting:boolean;
    isBasicInfoSubmited:boolean;

    isLocationInfoSubmiting:boolean;
    isLocationInfoSubmited:boolean;

    isSocialInfoSubmiting:boolean;
    isSocialInfoSubmited:boolean;

    isChangePasswordSubmiting:boolean;
    isChangePasswordSubmited:boolean;
    
}
