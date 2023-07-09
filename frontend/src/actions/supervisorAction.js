import {
    SUPERVISOR_LOGIN_FAIL,
    SUPERVISOR_LOGIN_REQUEST,
    SUPERVISOR_LOGIN_SUCCESS,
    SUPERVISOR_LOGOUT,
    SUPERVISOR_PROFILE_REQUEST,
    // SUPERVISOR_PROFILE_ID_REQUEST,
    SUPERVISOR_PROFILE_SUCCESS,
    SUPERVISOR_PROFILE_FAIL,
    SUPERVISOR_CW_REQUEST,
    SUPERVISOR_CW_SUCCESS,
    SUPERVISOR_CW_FAIL,
    SUPERVISOR_UPDATE_APPLICATION_REQUEST,
    SUPERVISOR_APPROVE_APPLICATION_SUCCESS,
    SUPERVISOR_UPDATE_APPLICATION_FAIL
} from "../constants/supervisorConstants";

import {
  FACULTY_STUDENT_LIST_REQUEST,
  FACULTY_STUDENT_LIST_SUCCESS,
  FACULTY_STUDENT_LIST_FAIL
} from "../constants/facultyConstants"

import { BASE_URL_2 } from "../urlPath";
import axios from "axios";

export const supervisorLogin = (usernameSup, password) => async (dispatch) => {
    try {
      dispatch({ type: SUPERVISOR_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${BASE_URL_2}api/supervisor/supervisorLogin`,
        { usernameSup, password},
        config
      );

      dispatch({ type: SUPERVISOR_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("supervisorInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SUPERVISOR_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
}; 

export const supervisorProfile = () => async (dispatch) => {
  try {
    dispatch({ type: SUPERVISOR_PROFILE_REQUEST});

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorProfileList`,
      config
    );

    dispatch({ type: SUPERVISOR_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_PROFILE_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const supervisorSupervisingStudList = () => async (dispatch, getState) => {
  try {
    
    const {
      supervisorLogin: { supervisorInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorViewSupervisingStudent`,
      config
    );

    dispatch({ type: SUPERVISOR_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_PROFILE_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
}; 

export const supervisorLogout = () => async (dispatch) => {
  localStorage.removeItem("supervisorInfo");
  dispatch({ type: SUPERVISOR_LOGOUT });
};

export const supervisorReadMeetingLog = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorReadMeetingLog`, config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorReadRPDResult = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorReadRPDResult`, config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorReadWCDResult = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorReadWCDResult`, config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorReadPR = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPERVISOR_CW_REQUEST,
    });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL_2}api/supervisor/supervisorReadPR`, config);

    dispatch({
      type: SUPERVISOR_CW_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const supervisorEvaluatePR = (id, grade) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPERVISOR_UPDATE_APPLICATION_REQUEST,
    });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/supervisor/supervisorEvaluatePR/${id}`, {grade}, config);

    dispatch({
      type: SUPERVISOR_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: SUPERVISOR_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const supervisorReadPRResult = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPERVISOR_CW_REQUEST });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/supervisor/supervisorReadPRResult`, config
    );

    dispatch({ type: SUPERVISOR_CW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: SUPERVISOR_CW_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const supervisorViewStudentData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_STUDENT_LIST_REQUEST,
    });

    const {
      supervisorLogin: { supervisorInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${supervisorInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL_2}api/supervisor/supervisorFetchDataStudent`, config);

    dispatch({
      type: FACULTY_STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_STUDENT_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};
