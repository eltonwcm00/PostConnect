import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
    FACULTY_REGISTER_FAIL,
    FACULTY_REGISTER_REQUEST,
    FACULTY_REGISTER_SUCCESS,
    FACULTY_SUPERVISOR_LIST_REQUEST,
    FACULTY_SUPERVISOR_LIST_SUCCESS,
    FACULTY_SUPERVISOR_LIST_FAIL,
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

export const facultyRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_REGISTER_REQUEST:
      return { loading: true };
    case FACULTY_REGISTER_SUCCESS:
      return { loading: false, facultyInfo: action.payload, successMsg: true };
    case FACULTY_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const facultyReadAssignSupervisionReducer = (state = { fetchSupervisorList: [] }, action) => {
  switch (action.type) {
    case FACULTY_SUPERVISOR_LIST_REQUEST:
      return { loading: true };
    case FACULTY_SUPERVISOR_LIST_SUCCESS:
      return { loading: false, fetchSupervisorList: action.payload };
    case FACULTY_SUPERVISOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
