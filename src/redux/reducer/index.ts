import { combineReducers } from "redux";
import { AuthReducer } from "../auth/AuthReducer";
import {QrDataReducer} from "../qrdata/QrDataReducer"
export default combineReducers({
    auth: AuthReducer,
    qrData:QrDataReducer
});
