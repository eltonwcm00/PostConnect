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
} from "../constants/facultyConstants";

import axios from "axios";

export const facultyLogin = (userNameFac, password) => async (dispatch) => {
    try {
      dispatch({ type: FACULTY_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/faculty/facultyLogin",
        { userNameFac, password},
        config
      );

      dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("facultyInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: FACULTY_LOGIN_FAIL,
        payload:
          error.response 
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const facultyLogout = () => async (dispatch) => {
  localStorage.removeItem("facultyInfo");
  dispatch({ type: FACULTY_LOGOUT });
};

export const facultyPanelRegistration = (usernamePanel, password, cfrmPassword) => async (dispatch, getState) => {
  try {
    dispatch({ type: FACULTY_REGISTER_REQUEST });

      const {
        facultyLogin: { facultyInfo },
      } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/faculty/facultyPanelRegistration",
      { usernamePanel, password, cfrmPassword },
      config
    );

    dispatch({ type: FACULTY_REGISTER_SUCCESS, payload: data });

    dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("facultyInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FACULTY_REGISTER_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultySupervisorRegistration = (usernameSup, password, cfrmPassword, numSupervision, academicPos) => async (dispatch, getState) => {
  try {
    dispatch({ type: FACULTY_REGISTER_REQUEST });

      const {
        facultyLogin: { facultyInfo },
      } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/faculty/facultySupervisorRegistration",
      { usernameSup, password, cfrmPassword, numSupervision, academicPos },
      config
    );

    dispatch({ type: FACULTY_REGISTER_SUCCESS, payload: data });

    dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("facultyInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FACULTY_REGISTER_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyStudentRegistration = (usernameStud, password, cfrmPassword, dateJoin, degreeLvl) => async (dispatch, getState) => {
  try {
    dispatch({ type: FACULTY_REGISTER_REQUEST });

      const {
        facultyLogin: { facultyInfo },
      } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/faculty/facultyStudentRegistration",
      { usernameStud, password, cfrmPassword, dateJoin, degreeLvl },
      config
    );

    dispatch({ type: FACULTY_REGISTER_SUCCESS, payload: data });

    dispatch({ type: FACULTY_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("facultyInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FACULTY_REGISTER_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyReadAssignSupervision = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_SUPERVISOR_LIST_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo  },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/faculty/facultyReadAssignSupervision", config);

    dispatch({
      type: FACULTY_SUPERVISOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_SUPERVISOR_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyUpdateAssignSupervision = (id, numSupervision, academicPos) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_NO_SUPERVISION_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/faculty/facultyReadAssignSupervision/${id}`,
                                      {numSupervision, academicPos}, config);

    dispatch({
      type: FACULTY_UPDATE_NO_SUPERVISION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_UPDATE_NO_SUPERVISION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
}

export const facultyReadChooseStudent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_STUDENT_LIST_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/faculty/facultyReadChooseStudent", config);

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

export const facultyReadEvaluateRPDApplication = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_APPLICATION_LIST_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/faculty/facultyReadEvaluateRPDApplication", config);

    dispatch({
      type: FACULTY_APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_APPLICATION_LIST_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyUpdateApplication = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_APPLICATION_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/faculty/facultyReadEvaluateRPDApplication/${id}`, {}, config);

    dispatch({
      type: FACULTY_UPDATE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type:FACULTY_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
}

export const facultyApproveApplication = (id, dateScheduleRPD) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_APPLICATION_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/faculty/facultyReadEvaluateRPDApplication2/${id}`, {dateScheduleRPD}, config);

    dispatch({
      type: FACULTY_APPROVE_APPLICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type:FACULTY_UPDATE_APPLICATION_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
}



