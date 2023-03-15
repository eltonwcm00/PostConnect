import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_STUDENT_LIST_REQUEST,
    SUPERVISOR_STUDENT_LIST_SUCCESS,
    SUPERVISOR_STUDENT_LIST_FAIL,
    SUPERVISOR_CHOOSE_STUDENT_REQUEST,
    SUPERVISOR_CHOOSE_STUDENT_SUCCESS,
    SUPERVISOR_CHOOSE_STUDENT_FAIL,
} from "../constants/supervisorConstants";

export const supervisorLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case SUPERVISOR_LOGIN_REQUEST:
          return { loading: true };
        case SUPERVISOR_LOGIN_SUCCESS:
          return { loading: false, supervisorInfo: action.payload, successMsg: true };
        case SUPERVISOR_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case SUPERVISOR_LOGOUT:
          return {};
        default:
          return state;
      }
};

export const supervisorReadChooseStudentReducer = (state = { fetchStudentList: [] }, action) => {
  switch (action.type) {
    case SUPERVISOR_STUDENT_LIST_REQUEST:
      return { loading: true };
    case SUPERVISOR_STUDENT_LIST_SUCCESS:
      return { loading: false, fetchStudentList: action.payload };
    case SUPERVISOR_STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supervisorUpdateChooseStudentReducer = (state = {}, action) => { 
  switch (action.type) {
    case SUPERVISOR_CHOOSE_STUDENT_REQUEST:
      return { loading: true };
    case SUPERVISOR_CHOOSE_STUDENT_SUCCESS:
      return { loading: false, fetchStudent: action.payload, successMsg: true, };
    case SUPERVISOR_CHOOSE_STUDENT_FAIL:
      return { loading: false, error2: action.payload};
    default:
      return state;
  }
};
