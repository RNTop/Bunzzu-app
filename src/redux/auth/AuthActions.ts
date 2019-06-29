import { ENDPOINT } from "./../../api/Endpoint";
import { AuthActionTypes } from "./AuthActionTypes";

import axios from "axios";
import NavigationService from "../../navigation/NavigationService";
import StorageHelper from "../../helpers/StorageHelper";
import AsyncStorage from '@react-native-community/async-storage';
export const loginUser = ({ email, password }) => {

	
	return dispatch => {
		dispatch({ type:AuthActionTypes.LOGIN_USER_START });		
		const	url=ENDPOINT+"function=loginUser&password="+password+"&username="+email;

		axios
			.get(url)
			.then(res => {
								
				if (res.data.response == "OK") {					
					loginUserSuccess(dispatch,res.data);					
				} else {
					loginUserFail(dispatch, res.data.Error);
					alert(res.data.Error)
				}
			})
			.catch(error => {
				console.log(error);
				loginUserFail(dispatch, "There was an error connection");
				
			});
	};
};

const loginUserFail = (dispatch, errorMessage) => {
	dispatch({
		type: AuthActionTypes.LOGIN_USER_FAIL,
		payload: {
			errorMessage: errorMessage
		}
	});
};

const loginUserSuccess = (dispatch, data) => {
	StorageHelper.saveItem(StorageHelper.StorageKeys.UserInfo,JSON.stringify(data))
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: AuthActionTypes.LOGIN_USER_SUCCESS,
		payload: data
	});
};


export const autoLogin = (data) => {	
	NavigationService.navigateAndReset("Home");
	return dispatch => {
		dispatch({
			type: AuthActionTypes.LOGIN_USER_SUCCESS,
			payload: data
		});
	};
};

export const logout = () => {
	applogout()
	NavigationService.navigateAndReset("Login");	
	return dispatch => {
		dispatch({
			type: AuthActionTypes.LOGIN_USER_FAIL,
			payload: "There was an error connection"
		});
	};
};

const applogout=async()=> {		
	await AsyncStorage.removeItem(StorageHelper.StorageKeys.UserInfo)
			
}
