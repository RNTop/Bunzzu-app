import { combineReducers } from "redux";
import { AuthReducer } from "../auth/AuthReducer";
import {QrDataReducer} from "../qrdata/QrDataReducer"
import {EditProfileReducer} from "../editprofile/EditProfileReducers"
export default combineReducers({
    auth: AuthReducer,
    qrData:QrDataReducer,
    edit:EditProfileReducer
});
//# sourceMappingURL=index.js.map