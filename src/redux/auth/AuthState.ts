import { User } from "./../../models/Auth";
export interface AuthState {
	user: User;
	loading: boolean;
	error: boolean;
	errorMessage: string;
}
