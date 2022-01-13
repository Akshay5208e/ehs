import {combineReducers} from "redux";
import userReducer from "./index";

const rootReducer = combineReducers({
    user:userReducer
});
export default rootReducer