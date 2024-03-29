import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import localStorage from 'localStorage';

import {
  facultyLoginReducer, 
  facultyProfileReducer,
  facultyRegistrationReducer,
  facultyReadAssignSupervisionReducer,
  facultyUpdateAssignSupervisionReducer,
  facultyReadApplicationReducer,
  facultyUpdateApplicationReducer,
  facultyReadChooseStudentReducer,
  facultyUpdateChooseStudentReducer,
  facultySetPRReducer
} from "./reducers/facutyReducers";

import { 
  studentStatusValidatorReducer,
  studentLoginReducer,
  studentProfileReducer,
  studentCWReadRequestReducer,
  studentCWRequestReducer,
  studentApplicationStatusReducer,
  studentApplicationStatus2Reducer,
  studentApplicationStatus3Reducer,
  studentMeetingLogStatusReducer,
  studentPRLandingPageReducer,
  studentPRSubmitReducer,
} from "./reducers/studentReducers";

import {
  supervisorLoginReducer, 
  supervisorProfileReducer,
  supervisorReadCWReducer,
  supervisorEvaluatePRReducer
} from "./reducers/supervisorReducers";

import {
  panelLoginReducer,
  panelProfileReducer,
  panelReadApplicationReducer,
  panelEvaluateRPDReducer,
} from "./reducers/panelReducers";

const reducer = combineReducers({
    facultyLogin: facultyLoginReducer,
    facultyProfile: facultyProfileReducer,
    facultyRegistration: facultyRegistrationReducer,
    
    facultyReadAssignSupervision: facultyReadAssignSupervisionReducer,
    facultyUpdateAssignSupervision: facultyUpdateAssignSupervisionReducer,
    facultyReadApplication: facultyReadApplicationReducer,
    facultyUpdateApplication: facultyUpdateApplicationReducer,
    facultyReadChooseStudent: facultyReadChooseStudentReducer,
    facultyUpdateChooseStudent: facultyUpdateChooseStudentReducer,
    facultySetPR: facultySetPRReducer,

    supervisorLogin: supervisorLoginReducer,
    supervisorProfile: supervisorProfileReducer,
    supervisorReadCW: supervisorReadCWReducer,
    supervisorEvaluatePR: supervisorEvaluatePRReducer,
   
    studentLogin: studentLoginReducer,
    studentProfile: studentProfileReducer,
    studentStatusValidator: studentStatusValidatorReducer,
    studentCWReadRequest: studentCWReadRequestReducer,
    studentCWRequest: studentCWRequestReducer,
    studentApplicationStatus: studentApplicationStatusReducer,
    studentApplicationStatus2: studentApplicationStatus2Reducer,
    studentApplicationStatus3: studentApplicationStatus3Reducer,
    studentMeetingLogStatus: studentMeetingLogStatusReducer,
    studentPRLandingPage: studentPRLandingPageReducer,
    studentPRSubmit: studentPRSubmitReducer,

    panelLogin: panelLoginReducer,
    panelProfile: panelProfileReducer,
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
    studentLogin: { studentInfo: studentInfoFromStorage || null },
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