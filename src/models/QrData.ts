export interface ClamimRewards {
	message : AlertMessage;
	qrcodeId:number;
}

export interface GivePoints {
	message : AlertMessage;
	qrcodeId: number;
	points: number;
}
  interface AlertMessage {
	descMessage : string;
	titleMessage: string;	
}
