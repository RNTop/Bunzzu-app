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
        instegram:"",
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
        case EditProfileActionTypes.EDIT_USER_COUNTRY_CODE_CHANGED:
             let CountryCodeupdatedUser=state.user
             CountryCodeupdatedUser.countryCode=action.payload
        return {
            ...state,
            user:CountryCodeupdatedUser
            };
        case EditProfileActionTypes.EDIT_USER_NAME_CHANGED:
            let NameupdatedUser=state.user
            NameupdatedUser.name=action.payload
        return {
           ...state,
           user:NameupdatedUser
           };
        case EditProfileActionTypes.EDIT_USER_PHONE_CHANGED:
           let PhoneupdatedUser=state.user
           PhoneupdatedUser.phone=action.payload
        return {
          ...state,
          user:PhoneupdatedUser
          };
        case EditProfileActionTypes.EDIT_USER_EMAIL_CHANGED:
          let EmailupdatedUser=state.user
          EmailupdatedUser.email=action.payload
        return {
         ...state,
         user:EmailupdatedUser
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
            
         
          
           
            
		default:
			return state;
	}
};
