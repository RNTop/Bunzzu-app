import { ENDPOINT } from "./../../api/Endpoint";
import { QrDataActionTypes } from "./QrDataActionTypes";

import axios from "axios";
import NavigationService from "../../navigation/NavigationService";


export const qrcodeScan = (data) => {	
	NavigationService.navigateAndResetWithParams("QrScanner",{QrType:data});
	return dispatch => {
		dispatch({
			type: QrDataActionTypes.QR_SCAN_START,
			payload: data
		});
	};
};
export const scanningCancel= () => {	
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

