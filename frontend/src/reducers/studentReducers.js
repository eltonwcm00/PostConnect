import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,

    STUDENT_CW_READ_REQUEST,
    STUDENT_CW_READ_SUCCESS,
    STUDENT_CW_READ_FAIL,

    STUDENT_CW_REQUEST,
    STUDENT_CW_SUCCESS,
    STUDENT_CW_FAIL,

    STUDENT_APPLICATION,
    STUDENT_MEETING_LOG,
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

export const studentCWReadRequestReducer = (state = { studentCW: [] }, action) => {
  switch (action.type) {
    case STUDENT_CW_READ_REQUEST:
      return { loadingStudentCW: true };
    case STUDENT_CW_READ_SUCCESS:
      return { loadingStudentCW: false, studentCW: action.payload };
    case STUDENT_CW_READ_FAIL:
      return { loadingStudentCW: false, errorStudentCW: action.payload };
    default:
      return state;
  }
};

export const studentCWRequestReducer = (state = {}, action) => {
  switch (action.type) {
      case STUDENT_CW_REQUEST:
        return { loading: true };
      case STUDENT_CW_SUCCESS:
        return { loading: false, applicationInfo: action.payload, successMsg: true };
      case STUDENT_CW_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const studentApplicationStatusReducer = (state = {}, action) => {
  switch (action.type) {
      case  STUDENT_APPLICATION:
        return { applicationStatusMsg: true,
                 currentApplicationInfo: action.payload };
      default:
        return state;
    }
};

export const studentMeetingLogStatusReducer = (state = {}, action) => {
  switch (action.type) {
      case  STUDENT_MEETING_LOG:
        return { meetingLogStatusMsg: true,
                 currentMeetingInfo: action.payload };
      default:
        return state;
    }
};

