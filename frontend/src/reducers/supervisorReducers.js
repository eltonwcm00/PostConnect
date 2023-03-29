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

