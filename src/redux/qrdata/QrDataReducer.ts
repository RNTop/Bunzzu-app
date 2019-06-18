import { QrDataState } from "./QrDataState";
import { QrDataActionTypes } from "./QrDataActionTypes";
const INITIAL_STATE: QrDataState = {
	QrData: {
		GivePoints: {
			descMessage: "",
			titleMessage: "",
			qrcodeId: 0,
			points: 0
		},
		ClamimRewards: {
			descMessage: "",
			titleMessage: "",
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

		case QrDataActionTypes.ClamimRewardsSuccess:
			return {
				...state,
				loading: false,
				QrData: action.payload
			};
		case QrDataActionTypes.ClamimRewardsFail:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
			};

		case QrDataActionTypes.GivePointsSuccess:
			return {
				...state,
				loading: false,
				QrData: action.payload
			};
		case QrDataActionTypes.GivePointsFail:
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
