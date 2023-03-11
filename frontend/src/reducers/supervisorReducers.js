import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
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