import { QrData } from "./../../models/QrData";
export interface QrDataState {
	QrData: QrData;
	loading: boolean;
	error: boolean;
	errorMessage: string;
}
