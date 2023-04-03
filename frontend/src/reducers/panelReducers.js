import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
    PANEL_RPD_LIST_REQUEST,
    PANEL_RPD_LIST_SUCCESS,
    PANEL_RPD_LIST_FAIL,
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

export const panelReadRPDReducer = (state = { fetchRPDList: [] }, action) => {
  switch (action.type) {
    case PANEL_RPD_LIST_REQUEST:
      return { loading: true };
    case PANEL_RPD_LIST_SUCCESS:
      return { loading: false, fetchRPDList: action.payload };
    case PANEL_RPD_LIST_FAIL:
      return { loading: false, errorRPDList: action.payload };
    default:
      return state;
  }
};

