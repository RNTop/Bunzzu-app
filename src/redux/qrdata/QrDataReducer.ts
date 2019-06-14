import { QrDataState } from "./QrDataState";
import { QrDataActionTypes } from "./QrDataActionTypes";
const INITIAL_STATE: QrDataState = {
    QrData:{
        GivePoints: "g",
	    ClamimRewards: "c",
    },
	loading: false,
	error: false,
	errorMessage: ""
};

interface Action {
	type: string;
	payload: any;
}

export const QrDataReducer = (
	state: QrDataState = INITIAL_STATE,
	action: Action
): QrDataState => {
	switch (action.type) {
		case QrDataActionTypes.QR_SCAN_START:
			return {
				...state,
				error: false,
				loading: true,
				errorMessage: ""
			};

		case QrDataActionTypes.QR_SCAN_SUCCESS:
			return {
				...state,
				loading: false,				
				QrData: action.payload
			};

		case QrDataActionTypes.QR_SCAN_FAIL:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
			};

		default:
			return state;
	}
};
