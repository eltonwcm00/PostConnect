import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,
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