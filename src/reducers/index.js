import { combineReducers } from "redux";
import auth from "./auth_reducer";
import message from "./message";

export default combineReducers({
    auth,
    message,
});
