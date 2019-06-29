import { GivePoints, ClamimRewards } from "./../../models/QrData";
export interface QrDataState {
	QrData: {
		GivePoints:GivePoints;
		ClamimRewards:ClamimRewards
	};
	loading: boolean;
	error: boolean;
	errorMessage: string;
}
