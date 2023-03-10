import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  facultyLoginReducer, facultyRegistrationReducer
} from "./reducers/facutyReducers";

import { 
  studentLoginReducer
} from "./reducers/studentReducers";

const reducer = combineReducers({
    facultyLogin: facultyLoginReducer,
    facultyRegistration: facultyRegistrationReducer,
    studentLogin: studentLoginReducer,
})

const facultyInfoFromStorage = localStorage.getItem("facultyInfo")
  ? JSON.parse(localStorage.getItem("facultyInfo"))
  : null;

const studentInfoFromStorage = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : null;

// initial state of userInfo from the login reducer is equivalent to userInfoFromStorage
const initialState = {
    facultyLogin: { facultyInfo: facultyInfoFromStorage },
    studentLogin: { studentInfo: studentInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;