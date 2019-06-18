import { ENDPOINT } from "./../../api/Endpoint";
import { QrDataActionTypes } from "./QrDataActionTypes";
import {
	Alert
} from "react-native";
import axios from "axios";
import NavigationService from "../../navigation/NavigationService";


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
				errorMessage: "Cancelled by User"
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

				if (res.data.response == "OK") {
					SuccessAlert(res.data.titleMessage, res.data.descMessage)
					let Data = res.data;
					Data["qrCodeId"] = qrCodeId;
					Data["points"] = points;
					givePointsApiConnectSuccess(dispatch, Data)
				} else {
					givePointsApiConnectFail(dispatch, res.data.Error)
					SuccessAlert("Error", res.data.Error)
				}
			})
			.catch(error => {
				console.log(error);
				SuccessAlert("Error", "There was an error connection")
				givePointsApiConnectFail(dispatch, "There was an error connection")

			});
	};
};

const givePointsApiConnectSuccess = (dispatch, data) => {
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: QrDataActionTypes.GivePointsSuccess,
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
		type: QrDataActionTypes.GivePointsFail,
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
				if (res.data.response == "OK") {
					SuccessAlert(res.data.titleMessage, res.data.descMessage)
					let Data = res.data;
					Data["qrCodeId"] = qrCodeId;
					clamimRewardsApiConnectSuccess(dispatch, Data)
				} else {
					SuccessAlert("Error", res.data.Error)
					clamimRewardsApiConnectFail(dispatch, res.data.Error)
				}
			})
			.catch(error => {
				console.log(error);
				SuccessAlert("Error", "There was an error connection")
				clamimRewardsApiConnectFail(dispatch, "There was an error connection")

			});
	};
};
const clamimRewardsApiConnectSuccess = (dispatch, data) => {
	NavigationService.navigateAndReset("Home");
	dispatch({
		type: QrDataActionTypes.ClamimRewardsSuccess,
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
		type: QrDataActionTypes.ClamimRewardsFail,
		payload: {
			errorMessage: errorMessage
		}
	});
};
const SuccessAlert = (title, body) => {
	Alert.alert(
		title,
		body,
		[
			{ text: 'OK', onPress: () => console.log("ok"), style: 'ok' },

		]
	);
}