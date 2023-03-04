import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    facultyLoginReducer, facultyPanelRegistrationReducer
} from "./reducers/facutyReducers";

const reducer = combineReducers({
    facultyLogin:facultyLoginReducer,
    facultyPanelRegistration: facultyPanelRegistrationReducer,
})

const facultyInfoFromStorage = localStorage.getItem("facultyInfo")
  ? JSON.parse(localStorage.getItem("facultyInfo"))
  : null;

// get and set the jwt
// initial state of userInfo from the login reducer is equivalent to userInfoFromStorage
const initialState = {
    facultyLogin: { facultyInfo: facultyInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;