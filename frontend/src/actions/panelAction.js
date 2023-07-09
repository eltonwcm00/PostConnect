import {
    PANEL_LOGIN_FAIL,
    PANEL_LOGIN_REQUEST,
    PANEL_LOGIN_SUCCESS,
    PANEL_LOGOUT,
    PANEL_PROFILE_REQUEST,
    PANEL_PROFILE_SUCCESS,
    PANEL_PROFILE_FAIL,
    PANEL_APPLICATION_LIST_REQUEST,
    PANEL_APPLICATION_LIST_SUCCESS,
    PANEL_APPLICATION_LIST_FAIL,
    PANEL_UPDATE_APPLICATION_REQUEST,
    PANEL_APPROVE_APPLICATION_SUCCESS,
    PANEL_REJECT_APPLICATION_SUCCESS,
    PANEL_UPDATE_APPLICATION_FAIL,
} from "../constants/panelConstants";

import axios from "axios";
import { BASE_URL_2 } from "../urlPath";

export const panelLogin = (usernamePanel, password) => async (dispatch) => {
    try {
      dispatch({ type: PANEL_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${BASE_URL_2}api/panel/panelLogin`,
        { usernamePanel, password},
        config
      );

      dispatch({ type: PANEL_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("panelInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: PANEL_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
}; 

export const panelLogout = () => async (dispatch) => {
  localStorage.removeItem("panelInfo");
  dispatch({ type: PANEL_LOGOUT });
};

export const panelProfile = () => async (dispatch) => {
  try {
    dispatch({ type: PANEL_PROFILE_REQUEST});

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/panel/panelProfileList`,
      config
    );

    dispatch({ type: PANEL_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: PANEL_PROFILE_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const panelReadRPD = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_APPLICATION_LIST_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.get(`ttp://localhost:5000/api/panel/panelReadRPD`, config);

    dispatch({
      type: PANEL_APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_APPLICATION_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluatePassRPD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelEvaluateRPD/${id}`, {}, config);

    dispatch({
      type: PANEL_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluateFailRPD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelEvaluateRPD2/${id}`, {}, config);

    dispatch({
      type: PANEL_REJECT_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelReadWCD = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_APPLICATION_LIST_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL_2}api/panel/panelReadWCD`, config);

    dispatch({
      type: PANEL_APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_APPLICATION_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluatePassWCD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelEvaluateWCD/${id}`, {}, config);

    dispatch({
      type: PANEL_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluateFailWCD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelEvaluateWCD2/${id}`, {}, config);

    dispatch({
      type: PANEL_REJECT_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelReadPR = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_APPLICATION_LIST_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL_2}api/panel/panelReadPR`, config);

    dispatch({
      type: PANEL_APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_APPLICATION_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const panelEvaluatePR = (id, grade) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PANEL_UPDATE_APPLICATION_REQUEST,
    });

    const {
      panelLogin: { panelInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${panelInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelEvaluatePR/${id}`, {grade}, config);

    dispatch({
      type: PANEL_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: PANEL_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};


