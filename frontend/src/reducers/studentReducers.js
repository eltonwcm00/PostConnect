import {
    STUDENT_STATUS_VALIDATOR,
  
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
    STUDENT_APPLICATION_2,
    STUDENT_APPLICATION_3,
    STUDENT_MEETING_LOG,

    PR_READ_REQUEST,
    
    STUDENT_PR_REQUEST,
    STUDENT_PR_SUCCESS,
    STUDENT_PR_FAIL,
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

export const studentStatusValidatorReducer = (state = {}, action) => {
  switch (action.type) {
      case STUDENT_STATUS_VALIDATOR:
        return {flag: true, studentTerminationStatus: action.payload}
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

export const studentPRSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_PR_REQUEST:
      return { loadingPR: true };
    case STUDENT_PR_SUCCESS:
      return { loadingPR: false, studentPR: action.payload, successStudentPR: true };
    case STUDENT_PR_FAIL:
      return { loadingPR: false, errorStudentPR: action.payload, failedStudentPR: true};
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

export const studentApplicationStatus2Reducer = (state = {}, action) => {
  switch (action.type) {
      case  STUDENT_APPLICATION_2:
        return { applicationStatusMsg2: true,
                 currentApplicationInfo2: action.payload };
      default:
        return state;
    }
};

export const studentPRLandingPageReducer = (state = {}, action) => {
  switch (action.type) {
      case PR_READ_REQUEST:
        return { landingMsgStatus: true, landingMsg: action.payload};
      default:
        return state;
  }
};

export const studentApplicationStatus3Reducer = (state = {}, action) => {
  switch (action.type) {
      case  STUDENT_APPLICATION_3:
        return { applicationStatusMsg3: true,
                 currentApplicationInfo3: action.payload };
      default:
        return state;
    }
};