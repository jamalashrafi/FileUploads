import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth.js";

export default combineReducers({
    auth, //Es6 replacement for auth : auth
    form : formReducer
});