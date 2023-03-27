import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,

    STUDENT_RPD_REQUEST,
    STUDENT_RPD_SUCCESS,
    STUDENT_RPD_FAIL,

    STUDENT_APPLICATION,
} from "../constants/studentConstants";

export const studentLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_LOGIN_REQUEST:
          return { loading: true };
        case STUDENT_LOGIN_SUCCESS:
          return { loading: false, studentInfo: action.payload, successMsg: true };
        case STUDENT_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case STUDENT_LOGOUT:
          return {};
        default:
          return state;
      }
};

export const studentRPDRequestReducer = (state = {}, action) => {
  switch (action.type) {
      case STUDENT_RPD_REQUEST:
        return { loading: true };
      case STUDENT_RPD_SUCCESS:
        return { loading: false, studentInfo: action.payload, successMsg: true };
      case STUDENT_RPD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const studentApplicationStatusReducer = (state = {}, action) => {
  switch (action.type) {
      case  STUDENT_APPLICATION:
        return { applicationStatusMsg: true, currentStudentInfo: action.payload };
      default:
        return state;
    }
};
