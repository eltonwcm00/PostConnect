import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
    FACULTY_REGISTER_PANEL_FAIL,
    FACULTY_REGISTER_PANEL_REQUEST,
    FACULTY_REGISTER_PANEL_SUCCESS,
} from "../constants/facultyConstants";

export const facultyLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case FACULTY_LOGIN_REQUEST:
          return { loading: true };
        case FACULTY_LOGIN_SUCCESS:
          return { loading: false, facultyInfo: action.payload, successMsg: true };
        case FACULTY_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case FACULTY_LOGOUT:
          return {};
        default:
          return state;
      }
};

export const facultyPanelRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_REGISTER_PANEL_REQUEST:
      return { loading: true };
    case FACULTY_REGISTER_PANEL_SUCCESS:
      return { loading: false, facultyInfo: action.payload, successMsg: true };
    case FACULTY_REGISTER_PANEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};