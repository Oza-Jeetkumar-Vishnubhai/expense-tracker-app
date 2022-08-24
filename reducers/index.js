import { combineReducers } from "redux";
import expenseData  from "./expenseDataReducer";

const rootReducers = combineReducers({
    expenseData
});

export default rootReducers;