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
export const userInfoChanged = (newUserInfo,NewInitStatus) => {
	
	return dispatch => {
		dispatch({ 
            type:EditProfileActionTypes.EDIT_USER_INFO_CHANGED ,
            payload:{data:newUserInfo, initStatus:NewInitStatus}
        });		
	};
};

export const basicInfoSubmit = (user) => {
	
	return dispatch => {
		dispatch({ type:EditProfileActionTypes.BASIC_INFO_SUBMIT_START });	
		let {name,id,email,phone,countryCode,password}=	user
		const	url=ENDPOINT+"function=saveBasicInfo&name="+name+"&userId="+id+"&phone="+phone+"&countryCode="+countryCode+"&email="+email;
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
export const locationInfoSubmit = (user) => {
	alert(JSON.stringify(user))	
	return dispatch=>{
		dispatch({ type:EditProfileActionTypes.LOCATION_INFO_SUBMIT_START });	
		let {id,address,postcode}=	user
		const	locationurl="http://api.postcodes.io/postcodes/"+postcode;
		axios
		.get(locationurl)
		.then(res => {						
			if (res.data.status == 200) {				
				let {longitude,latitude} = res.data.result   
				let data={
					id:id,
					address:address,
					postcode:postcode,
					longitude:longitude,
					latitude:latitude
					}                   				
				locationInfoSubmitStart(dispatch,data);
			} else {
				locationInfoSubmitFail(dispatch);	
			}
		})
		.catch(error => {			
			locationInfoSubmitFail(dispatch);	
		});
	}
	
};
const  locationInfoSubmitStart= (dispatch,data) => {	
	let {id,address,postcode,longitude,latitude}=	data			
	const	url=ENDPOINT+"function=saveLocation&userId="+id+"&address="+address+"&postcode="+postcode+"&latitude="+latitude+"&longitude="+longitude;
	axios
		.get(url)
		.then(res => {					
				AlertMessage(res.data.titleMessage,res.data.descMessage)
			if (res.data.response == "OK") {                            				
				locationInfoSubmitSuccess(dispatch);					
			} else {
				locationInfoSubmitFail(dispatch);				
			}
		})
		.catch(error => {
			console.log(error);
			locationInfoSubmitFail(dispatch);
			
		});
};

const locationInfoSubmitFail = (dispatch) => {
	dispatch({type: EditProfileActionTypes.LOCATION_INFO_SUBMIT_FAIL });
};

const locationInfoSubmitSuccess = (dispatch) => {	
	dispatch({type: EditProfileActionTypes.LOCATION_INFO_SUBMIT_SUCCESS });
};
export const socialInfoSubmit = (user) => {	
	return dispatch => {
		dispatch({ type:EditProfileActionTypes.SOCIAL_INFO_SUBMIT_START });	
		let {facebook,google,twitter,instagram,website,id}=	user
		const	url=ENDPOINT+"function=saveSocial&userId="+id+"&facebook="+facebook+"&google="+google+"&twitter="+twitter+"&instagram="+instagram+"&website="+website;
		axios
			.get(url)
			.then(res => {
					
					AlertMessage(res.data.titleMessage,res.data.descMessage)
				if (res.data.response == "OK") {                            				
					socialInfoSubmitSuccess(dispatch);					
				} else {
					socialInfoSubmitFail(dispatch);
					
				}
			})
			.catch(error => {
				console.log(error);
				socialInfoSubmitFail(dispatch);
				
			});
	};
};

const socialInfoSubmitFail = (dispatch) => {
	dispatch({type: EditProfileActionTypes.SOCIAL_INFO_SUBMIT_FAIL });
};

const socialInfoSubmitSuccess = (dispatch) => {	
	dispatch({type: EditProfileActionTypes.SOCIAL_INFO_SUBMIT_SUCCESS });
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