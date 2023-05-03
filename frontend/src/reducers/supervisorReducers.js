import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_PROFILE_REQUEST,
    // SUPERVISOR_PROFILE_ID_REQUEST,
    SUPERVISOR_PROFILE_SUCCESS,
    SUPERVISOR_PROFILE_FAIL,
    SUPERVISOR_CW_REQUEST,
    SUPERVISOR_CW_SUCCESS,
    SUPERVISOR_CW_FAIL,
    SUPERVISOR_UPDATE_APPLICATION_REQUEST,
    SUPERVISOR_APPROVE_APPLICATION_SUCCESS,
    SUPERVISOR_UPDATE_APPLICATION_FAIL
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

export const supervisorProfileReducer = (state = { supervisorProfileList: [] }, action) => {
  switch (action.type) {
      case SUPERVISOR_PROFILE_REQUEST:
        return { loading: true };
      case SUPERVISOR_PROFILE_SUCCESS:
        return { loading: false, supervisorProfileList: action.payload};
      case SUPERVISOR_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const supervisorReadCWReducer = (state = { meetingLogList: [] }, action) => {
  switch (action.type) {
    case SUPERVISOR_CW_REQUEST:
      return { loading: true };
    case SUPERVISOR_CW_SUCCESS:
      return { loading: false, cwInfoSuccess: action.payload };
    case SUPERVISOR_CW_FAIL:
      return { loading: false, cwInfoFail: action.payload };
    default:
      return state;
  }
};

export const supervisorEvaluatePRReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPERVISOR_UPDATE_APPLICATION_REQUEST:
      return { loading: true };
    case SUPERVISOR_APPROVE_APPLICATION_SUCCESS:
      return { loading: false, successApproveMsg: action.payload };
    case SUPERVISOR_UPDATE_APPLICATION_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
};