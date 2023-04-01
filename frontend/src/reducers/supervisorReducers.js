import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_MEETING_LOG_REQUEST,
    SUPERVISOR_MEETING_LOG_SUCCESS,
    SUPERVISOR_MEETING_LOG_FAIL
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

export const supervisorReadMeetingLogReducer = (state = { meetingLogList: [] }, action) => {
  switch (action.type) {
    case SUPERVISOR_MEETING_LOG_REQUEST:
      return { loading: true };
    case SUPERVISOR_MEETING_LOG_SUCCESS:
      return { loading: false, meetingLogInfo: action.payload };
    case SUPERVISOR_MEETING_LOG_FAIL:
      return { loading: false, meetingLogFail: action.payload };
    default:
      return state;
  }
}

