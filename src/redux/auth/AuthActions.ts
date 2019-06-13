import { ENDPOINT } from "./../../api/Endpoint";
import { AuthActionTypes } from "./AuthActionTypes";

import axios from "axios";
import NavigationService from "../../navigation/NavigationService";
import StorageHelper from "../../helpers/StorageHelper";

export const loginUser = ({ email, password }) => {

	
	return dispatch => {
		dispatch({ type:AuthActionTypes.LOGIN_USER_START });		
		const	url=ENDPOINT+"function=loginUser&password="+password+"&username="+email;

		axios
			.get(url)
			.then(res => {
								
				if (res.data.response == "OK") {					
					loginUserSuccess(dispatch, res.data);
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
	StorageHelper.saveItem(StorageHelper.StorageKeys.USER_ID, data.id);
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: AuthActionTypes.LOGIN_USER_SUCCESS,
		payload: data
	});
};
