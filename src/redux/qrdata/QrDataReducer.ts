import { QrDataState } from "./QrDataState";
import { QrDataActionTypes } from "./QrDataActionTypes";
const INITIAL_STATE: QrDataState = {
	QrData: {
		GivePoints: {			
			message:{
				descMessage: "",
				titleMessage: ""
			},
			qrcodeId: 0,
			points: 0
		},
		ClamimRewards: {
			message:{
				descMessage: "",
				titleMessage: ""
			},
			qrcodeId: 0
		}
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

		case QrDataActionTypes.Clamim_Rewards_Success:
			return {
				...state,
				loading: false,
				QrData: action.payload
			};
		case QrDataActionTypes.Clamim_Rewards_Fail:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
			};

		case QrDataActionTypes.Give_Points_Success:
			return {
				...state,
				loading: false,
				QrData: action.payload
			};
		case QrDataActionTypes.Give_Points_Fail:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
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
