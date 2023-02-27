import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
} from "../constants/facultyConstants";

export const facultyLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case FACULTY_LOGIN_REQUEST:
          return { loading: true };
        case FACULTY_LOGIN_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case FACULTY_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case FACULTY_LOGOUT:
          return {};
        default:
          return state;
      }
};