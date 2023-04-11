import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import localStorage from 'localStorage';

import {
  facultyLoginReducer, 
  facultyRegistrationReducer,
  facultyReadAssignSupervisionReducer,
  facultyUpdateAssignSupervisionReducer,
  facultyReadApplicationReducer,
  facultyUpdateApplicationReducer,
  facultyReadChooseStudentReducer,
  facultyUpdateChooseStudentReducer
} from "./reducers/facutyReducers";

import { 
  studentLoginReducer,
  studentCWReadRequestReducer,
  studentCWRequestReducer,
  studentApplicationStatusReducer,
  studentApplicationStatus2Reducer,
  studentMeetingLogStatusReducer
} from "./reducers/studentReducers";

import {
  supervisorLoginReducer, 
  supervisorReadCWReducer,
} from "./reducers/supervisorReducers";

import {
  panelLoginReducer,
  panelReadApplicationReducer,
  panelEvaluateRPDReducer,
} from "./reducers/panelReducers";

const reducer = combineReducers({
    facultyLogin: facultyLoginReducer,
    facultyRegistration: facultyRegistrationReducer,
    
    facultyReadAssignSupervision: facultyReadAssignSupervisionReducer,
    facultyUpdateAssignSupervision: facultyUpdateAssignSupervisionReducer,
    facultyReadApplication: facultyReadApplicationReducer,
    facultyUpdateApplication: facultyUpdateApplicationReducer,
    facultyReadChooseStudent: facultyReadChooseStudentReducer,
    facultyUpdateChooseStudent: facultyUpdateChooseStudentReducer,

    supervisorLogin: supervisorLoginReducer,
    supervisorReadCW: supervisorReadCWReducer,
   
    studentLogin: studentLoginReducer,
    studentCWReadRequest: studentCWReadRequestReducer,
    studentCWRequest: studentCWRequestReducer,
    studentApplicationStatus: studentApplicationStatusReducer,
    studentApplicationStatus2: studentApplicationStatus2Reducer,
    studentMeetingLogStatus: studentMeetingLogStatusReducer,

    panelLogin: panelLoginReducer,
    panelReadApplication: panelReadApplicationReducer,
    panelEvaluateRPD: panelEvaluateRPDReducer
})

const facultyInfoFromStorage = localStorage.getItem("facultyInfo")
  ? JSON.parse(localStorage.getItem("facultyInfo"))
  : null;

const studentInfoFromStorage = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : null;

const supervisorInfoFromStorage = localStorage.getItem("supervisorInfo")
? JSON.parse(localStorage.getItem("supervisorInfo"))
: null;

const panelInfoFromStorage = localStorage.getItem("panelInfo")
? JSON.parse(localStorage.getItem("panelInfo"))
: null;

// initial state of userInfo from the login reducer is equivalent to userInfoFromStorage
const initialState = {
    facultyLogin: { facultyInfo: facultyInfoFromStorage },
    studentLogin: { studentInfo: studentInfoFromStorage },
    supervisorLogin: { supervisorInfo: supervisorInfoFromStorage },
    panelLogin: { panelInfo: panelInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;