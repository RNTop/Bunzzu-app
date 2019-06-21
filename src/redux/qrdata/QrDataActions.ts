import { ENDPOINT } from "./../../api/Endpoint";
import { QrDataActionTypes } from "./QrDataActionTypes";
import {
	Alert
} from "react-native";
import axios from "axios";
import NavigationService from "../../navigation/NavigationService";
import Strings from "../../constant/strings"

export const qrcodeScan = (data) => {
	NavigationService.navigateAndResetWithParams("QrScanner", { ScanType: data });
	return dispatch => {
		dispatch({
			type: QrDataActionTypes.QR_SCAN_START,
			payload: {}
		});
	};
};
export const scanningCancel = () => {
	NavigationService.navigateAndReset("Home");
	return dispatch => {
		dispatch({
			type: QrDataActionTypes.QR_SCAN_FAIL,
			payload: {
				errorMessage: Strings.cancelByUser
			}
		});
	};
};



export const givePointsApiConnect = ({ qrCodeId, userId, masterId, points }) => {

	return dispatch => {
		dispatch({ type: QrDataActionTypes.QR_SCAN_START });
		const url = ENDPOINT + "function=givePoints&qrCodeId=" + qrCodeId + "&userId=" + userId + "&points=" + points + "&masterId=" + masterId;

		axios
			.get(url)
			.then(res => {
				AlertMessage(res.data.titleMessage, res.data.descMessage)
				if (res.data.response == "OK") {				
					let Data = res.data;
					Data["qrCodeId"] = qrCodeId;
					Data["points"] = points;
					givePointsApiConnectSuccess(dispatch, Data)
				} else {
					givePointsApiConnectFail(dispatch, res.data.Error)				
				}
			})
			.catch(error => {
				console.log(error);
				AlertMessage(Strings.error, Strings.connection_Error_Msg)
				givePointsApiConnectFail(dispatch, Strings.connection_Error_Msg)

			});
	};
};

const givePointsApiConnectSuccess = (dispatch, data) => {
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: QrDataActionTypes.Give_Points_Success,
		payload: {
			QrData: {
				GivePoints: data
			}
		}
	});
};

const givePointsApiConnectFail = (dispatch, errorMessage) => {
	NavigationService.navigateAndResetWithParams("QrScanner", { ScanType:"givePoints" });
	dispatch({
		type: QrDataActionTypes.Give_Points_Fail,
		payload: {
			errorMessage: errorMessage
		}
	});
};

export const clamimRewardsApiConnect = ({ qrCodeId, userId, masterId }) => {

	return dispatch => {
		dispatch({ type: QrDataActionTypes.QR_SCAN_START });
		const url = ENDPOINT + "function=reedemReward&qrCodeId=" + qrCodeId + "&userId=" + userId + "&masterId=" + masterId;

		axios
			.get(url)
			.then(res => {
				AlertMessage(res.data.titleMessage, res.data.descMessage)
				if (res.data.response == "OK") {					
					let Data = res.data;
					Data["qrCodeId"] = qrCodeId;
					clamimRewardsApiConnectSuccess(dispatch, Data)
				} else {					
					clamimRewardsApiConnectFail(dispatch, res.data.Error)
				}
			})
			.catch(error => {
				console.log(error);
				AlertMessage(Strings.error, Strings.connection_Error_Msg)
				clamimRewardsApiConnectFail(dispatch, Strings.connection_Error_Msg)

			});
	};
};
const clamimRewardsApiConnectSuccess = (dispatch, data) => {
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: QrDataActionTypes.Clamim_Rewards_Success,
		payload: {
			QrData: {
				ClamimRewards: data
			}
		}
	});
};

const clamimRewardsApiConnectFail = (dispatch, errorMessage) => {
	NavigationService.navigateAndResetWithParams("QrScanner", { ScanType:"clamimRewards" });
	dispatch({
		type: QrDataActionTypes.Clamim_Rewards_Fail,
		payload: {
			errorMessage: errorMessage
		}
	});
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