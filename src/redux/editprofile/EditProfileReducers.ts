import { EditProfileActionTypes } from "./EditProfileActionTypes";
import { EditProfileState } from "./EditProfileState";

const INITIAL_STATE: EditProfileState = {
	user: {
		id: 0,
		masterId: 0,
		isMaster:false,
		email:"",
		username: "",
        appLogo: "",
        name:"",
        phone:0,
        countryCode:0,
        address:"",
        postcode:"",
        website:"",
        facebook:"",
        instagram:"",
        google:"",
        twitter:"",	
    },
    countries:[
     {
        id:0,
        name:'',
        image:'',
        iso:'' 
     }
    ],
    phonecodes:[
        {
            id:0,
            phonecode:"",
            name:'',
            image:'',
            iso:'' 
         }
    ],
	loading: false,
	error: false,
    errorMessage: "",
    isCompleted:false,   
    isBasicInfoSubmiting:false ,
    isBasicInfoSubmited:false,

    isLocationInfoSubmiting:false,
    isLocationInfoSubmited:false,

    isSocialInfoSubmiting:false,
    isSocialInfoSubmited:false,

    isChangePasswordSubmiting:false,
    isChangePasswordSubmited:false,
};

interface Action {
	type: string;
	payload: any;
}

export const EditProfileReducer = (
	state: EditProfileState = INITIAL_STATE,
	action: Action
): EditProfileState => {
	switch (action.type) {
		case EditProfileActionTypes.EDIT_USER_BASIC_INFO_START:
			return {
				...state,
				error: false,
				loading: true,
				errorMessage: ""
			};

		case EditProfileActionTypes.EDIT_USER_BASIC_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				isCompleted: true,
                user: action.payload.user,
                countries:action.payload.countries,
                phonecodes:action.payload.phonecodes
			};

		case EditProfileActionTypes.EDIT_USER_BASIC_INFO_FAIL:
			return {
				...state,
				error: true,
                loading: false,
                isCompleted:false,
				errorMessage: action.payload.errorMessage
            };
        case EditProfileActionTypes.EDIT_USER_INFO_CHANGED:             
            return {
                ...state,
                user:action.payload
                };        
        case EditProfileActionTypes.BASIC_INFO_SUBMIT_START:         
            return {
            ...state,
            isBasicInfoSubmited:false,
            isBasicInfoSubmiting:true
            };
        case EditProfileActionTypes.BASIC_INFO_SUBMIT_SUCCESS:         
            return {
            ...state,
            isBasicInfoSubmiting:false,
            isBasicInfoSubmited:true
            }; 
        case EditProfileActionTypes.BASIC_INFO_SUBMIT_FAIL:         
            return {
            ...state,
            isBasicInfoSubmiting:false,
            isBasicInfoSubmited:false
            }; 
        case EditProfileActionTypes.LOCATION_INFO_SUBMIT_START:         
            return {
            ...state,
            isLocationInfoSubmiting:true,
            isLocationInfoSubmited:false
        }; 
        case EditProfileActionTypes.LOCATION_INFO_SUBMIT_SUCCESS:         
            return {
            ...state,
            isLocationInfoSubmiting:false,
            isLocationInfoSubmited:true
            }; 
        case EditProfileActionTypes.LOCATION_INFO_SUBMIT_FAIL:         
            return {
            ...state,
            isLocationInfoSubmiting:false,
            isLocationInfoSubmited:false
            }; 
        case EditProfileActionTypes.SOCIAL_INFO_SUBMIT_START:         
            return {
            ...state,
            isSocialInfoSubmiting:true,
            isSocialInfoSubmited:false
        }; 
        case EditProfileActionTypes.SOCIAL_INFO_SUBMIT_SUCCESS:         
            return {
            ...state,
            isSocialInfoSubmiting:false,
            isSocialInfoSubmited:true
            }; 
        case EditProfileActionTypes.SOCIAL_INFO_SUBMIT_FAIL:         
            return {
            ...state,
            isSocialInfoSubmiting:false,
            isSocialInfoSubmited:false
            };
                
        case EditProfileActionTypes.CHANGE_PASSWORD_SUBMIT_START:         
            return {
            ...state,
            isChangePasswordSubmiting:true,
            isChangePasswordSubmited:false
            }; 
        case EditProfileActionTypes.CHANGE_PASSWORD_SUBMIT_SUCCESS:         
            return {
            ...state,
            isChangePasswordSubmiting:false,
            isChangePasswordSubmited:true
            }; 
        case EditProfileActionTypes.CHANGE_PASSWORD_SUBMIT_FAIL:         
            return {
            ...state,
            isChangePasswordSubmiting:false,
            isChangePasswordSubmited:false
            };  
        default:
			return state;
	}
};
