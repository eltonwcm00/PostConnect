import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
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