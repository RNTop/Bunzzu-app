import { AuthState } from "./AuthState";
import { AuthActionTypes } from "./AuthActionTypes";
const INITIAL_STATE: AuthState = {
	user: {
		id: 0,
		masterId: 0,
		isMaster:false,
		email:"",
		username: "",
		appLogo: ""
	},
	loading: false,
	error: false,
	errorMessage: ""
};

interface Action {
	type: string;
	payload: any;
}

export const AuthReducer = (
	state: AuthState = INITIAL_STATE,
	action: Action
): AuthState => {
	switch (action.type) {
		case AuthActionTypes.LOGIN_USER_START:
			return {
				...state,
				error: false,
				loading: true,
				errorMessage: ""
			};

		case AuthActionTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				loading: false,
				loginCompleted: true,
				user: action.payload.user
			};

		case AuthActionTypes.LOGIN_USER_FAIL:
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
