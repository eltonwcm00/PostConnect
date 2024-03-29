import {
    FACULTY_LOGIN_FAIL,
    FACULTY_LOGIN_REQUEST,
    FACULTY_LOGIN_SUCCESS,
    FACULTY_LOGOUT,
    FACULTY_PROFILE_REQUEST,
    FACULTY_PROFILE_SUCCESS,
    FACULTY_PROFILE_FAIL,
    FACULTY_REGISTER_FAIL,
    FACULTY_REGISTER_REQUEST,
    FACULTY_REGISTER_SUCCESS,
    FACULTY_SUPERVISOR_LIST_REQUEST,
    FACULTY_SUPERVISOR_LIST_SUCCESS,
    FACULTY_SUPERVISOR_LIST_FAIL,
    FACULTY_UPDATE_NO_SUPERVISION_REQUEST,
    FACULTY_UPDATE_NO_SUPERVISION_SUCCESS,
    FACULTY_UPDATE_NO_SUPERVISION_FAIL,
    FACULTY_APPLICATION_LIST_REQUEST,
    FACULTY_APPLICATION_LIST_SUCCESS,
    FACULTY_APPLICATION_LIST_FAIL,
    FACULTY_UPDATE_APPLICATION_REQUEST,
    FACULTY_UPDATE_APPLICATION_SUCCESS,
    FACULTY_APPROVE_APPLICATION_SUCCESS,
    FACULTY_UPDATE_APPLICATION_FAIL,
    FACULTY_STUDENT_LIST_REQUEST,
    FACULTY_STUDENT_LIST_SUCCESS,
    FACULTY_STUDENT_LIST_FAIL,
    FACULTY_CHOOSE_STUDENT_REQUEST,
    FACULTY_CHOOSE_STUDENT_SUCCESS,
    FACULTY_CHOOSE_STUDENT_FAIL,
    FACULTY_PROGRESS_REPORT_SUCCESS,
    FACULTY_PROGRESS_REPORT__FAIL
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

export const facultyProfileReducer = (state = { fetchProfile: [] }, action) => {
  switch (action.type) {
    case FACULTY_PROFILE_REQUEST:
      return { loading: true };
    case FACULTY_PROFILE_SUCCESS:
      return { loading: false, fetchProfile: action.payload };
    case FACULTY_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

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

export const facultyUpdateAssignSupervisionReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_UPDATE_NO_SUPERVISION_REQUEST:
      return { loading: true };
    case FACULTY_UPDATE_NO_SUPERVISION_SUCCESS:
      return { loading: false, successMsg: true };
    case FACULTY_UPDATE_NO_SUPERVISION_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
};

export const facultyReadChooseStudentReducer = (state = { fetchStudentList: [] }, action) => {
  switch (action.type) {
    case FACULTY_STUDENT_LIST_REQUEST:
      return { loading: true };
    case FACULTY_STUDENT_LIST_SUCCESS:
      return { loading: false, fetchStudentList: action.payload };
    case FACULTY_STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const facultyUpdateChooseStudentReducer = (state = {}, action) => { 
  switch (action.type) {
    case FACULTY_CHOOSE_STUDENT_REQUEST:
      return { loading: true };
    case FACULTY_CHOOSE_STUDENT_SUCCESS:
      return { loading: false, fetchStudent: action.payload, successMsg: true, };
    case FACULTY_CHOOSE_STUDENT_FAIL:
      return { loading: false, error2: action.payload};
    default:
      return state;
  }
};

export const facultyReadApplicationReducer = (state = { fetchApplicationList: [] }, action) => {
  switch (action.type) {
    case FACULTY_APPLICATION_LIST_REQUEST:
      return { loading: true };
    case FACULTY_APPLICATION_LIST_SUCCESS:
      return { loading: false, fetchApplicationList: action.payload };
    case FACULTY_APPLICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const facultyUpdateApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_UPDATE_APPLICATION_REQUEST:
      return { loading: true };
    case FACULTY_UPDATE_APPLICATION_SUCCESS:
      return { loading: false, successMsg: true };
    case FACULTY_APPROVE_APPLICATION_SUCCESS:
      return { loading: false, successApproveMsg: true };
    case FACULTY_UPDATE_APPLICATION_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
};

export const facultySetPRReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_PROGRESS_REPORT_SUCCESS:
      return { prDateInfo: action.payload, successMsg: true, };
    case FACULTY_PROGRESS_REPORT__FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};


