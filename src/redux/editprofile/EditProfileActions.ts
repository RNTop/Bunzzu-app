import { ENDPOINT } from "./../../api/Endpoint";
import { EditProfileActionTypes } from "./EditProfileActionTypes";
import {	Alert} from "react-native";
import axios from "axios";
import NavigationService from "../../navigation/NavigationService";
import StorageHelper from "../../helpers/StorageHelper";
import AsyncStorage from '@react-native-community/async-storage';
export const EditUserBasicInfo = (user) => {

	
	return dispatch => {
		dispatch({ type:EditProfileActionTypes.EDIT_USER_BASIC_INFO_START });		
		const	url=ENDPOINT+"function=getProfile&userId="+user.id+"&masterId="+user.masterId+"&isMaster="+user.masterId;
		axios
			.get(url)
			.then(res => {
								
				if (res.data.response == "OK") {                  
                    res.data.user["id"]=user.id
                    res.data.user["isMaster"]=user.isMaster
                    res.data.user["masterId"]=user.masterId
                    res.data.user["username"]=user.username
                    res.data.user["appLogo"]=user.appLogo                    				
					EditUserBasicInfoSuccess(dispatch,res.data);					
				} else {
					EditUserBasicInfoFail(dispatch, res.data.Error);
					alert(res.data.Error)
				}
			})
			.catch(error => {
				console.log(error);
				EditUserBasicInfoFail(dispatch, "There was an error connection");
				
			});
	};
};

const EditUserBasicInfoFail = (dispatch, errorMessage) => {
	dispatch({
		type: EditProfileActionTypes.EDIT_USER_BASIC_INFO_FAIL,
		payload: {
			errorMessage: errorMessage
		}
	});
};

const EditUserBasicInfoSuccess = (dispatch, data) => {	
	dispatch({
		type: EditProfileActionTypes.EDIT_USER_BASIC_INFO_SUCCESS,
		payload: data
	});
};
export const nameChanged = (code) => {	
	return dispatch => {
		dispatch({ 
            type:EditProfileActionTypes.EDIT_USER_NAME_CHANGED ,
            payload:code
        });		
	};
};
export const countryCodeChanged = (code) => {	
	return dispatch => {
		dispatch({ 
            type:EditProfileActionTypes.EDIT_USER_COUNTRY_CODE_CHANGED ,
            payload:code
        });		
	};
};
export const emailChanged = (code) => {	
	return dispatch => {
		dispatch({ 
            type:EditProfileActionTypes.EDIT_USER_EMAIL_CHANGED ,
            payload:code
        });		
	};
};
export const phoneChanged = (code) => {	
	return dispatch => {
		dispatch({ 
            type:EditProfileActionTypes.EDIT_USER_PHONE_CHANGED ,
            payload:code
        });		
	};
};

export const basicInfoSubmit = (user) => {
	
	return dispatch => {
		dispatch({ type:EditProfileActionTypes.BASIC_INFO_SUBMIT_START });	
		let {name,id,email,phone,countryCode,password}=	user
		const	url=ENDPOINT+"function=saveBasicInfo&name="+name+"&userid="+id+"&phone="+phone+"&countrycode="+countryCode+"&email="+email;
		axios
			.get(url)
			.then(res => {
					
					AlertMessage(res.data.titleMessage,res.data.descMessage)
				if (res.data.response == "OK") {                            				
					basicInfoSubmitSuccess(dispatch);					
				} else {
					basicInfoSubmitFail(dispatch);
					
				}
			})
			.catch(error => {
				console.log(error);
				basicInfoSubmitFail(dispatch);
				
			});
	};
};


const basicInfoSubmitFail = (dispatch) => {
	dispatch({type: EditProfileActionTypes.BASIC_INFO_SUBMIT_FAIL });
};

const basicInfoSubmitSuccess = (dispatch) => {	
	dispatch({type: EditProfileActionTypes.BASIC_INFO_SUBMIT_SUCCESS });
};
const AlertMessage = (title, body) => {
	Alert.alert(
		title,
		body,
		[
			{ text: 'OK', onPress: () => console.log("ok"), style: 'ok' },

		]
	);
}