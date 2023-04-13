import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
    PANEL_APPLICATION_LIST_REQUEST,
    PANEL_APPLICATION_LIST_SUCCESS,
    PANEL_APPLICATION_LIST_FAIL,
    PANEL_UPDATE_APPLICATION_REQUEST,
    PANEL_REJECT_APPLICATION_SUCCESS,
    PANEL_APPROVE_APPLICATION_SUCCESS,
    PANEL_UPDATE_APPLICATION_FAIL,
} from "../constants/panelConstants";

export const panelLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case PANEL_LOGIN_REQUEST:
          return { loading: true };
        case PANEL_LOGIN_SUCCESS:
          return { loading: false, panelInfo: action.payload, successMsg: true };
        case PANEL_LOGIN_FAIL:
          return { loading: false, error: action.payload };
        case PANEL_LOGOUT:
          return {};
        default:
          return state;
      }
};

export const panelReadApplicationReducer = (state = { fetchRPDList: [] }, action) => {
  switch (action.type) {
    case PANEL_APPLICATION_LIST_REQUEST:
      return { loading: true };
    case PANEL_APPLICATION_LIST_SUCCESS:
      return { loading: false, fetchApplicationList: action.payload };
    case PANEL_APPLICATION_LIST_FAIL:
      return { loading: false, errorApplicationList: action.payload };
    default:
      return state;
  }
};

export const panelEvaluateRPDReducer = (state = {}, action) => {
  switch (action.type) {
    case PANEL_UPDATE_APPLICATION_REQUEST:
      return { loading: true };
    case PANEL_REJECT_APPLICATION_SUCCESS:
      return { loading: false, successRejectMsg: action.payload };
    case PANEL_APPROVE_APPLICATION_SUCCESS:
      return { loading: false, successApproveMsg: action.payload };
    case PANEL_UPDATE_APPLICATION_FAIL:
      return { loading: false, error: action.payload};
    default:
      return state;
  }
};



