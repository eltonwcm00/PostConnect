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

import axios from "axios";
import { BASE_URL_2 } from "../urlPath";
// const BASE_URL_2 = process.env.BASE_URL_2;

export const facultyLogin = (userNameFac, password) => async (dispatch) => {
    try {
      dispatch({ type: FACULTY_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${BASE_URL_2}api/faculty/facultyLogin`,
        { userNameFac, password },
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

export const facultyViewOwnProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FACULTY_PROFILE_REQUEST });

    const {
      facultyLogin: { facultyInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL_2}api/faculty/facultyViewOwnProfile`, config
    );

    dispatch({ type: FACULTY_PROFILE_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: FACULTY_PROFILE_FAIL,
      payload:
        error.response 
          ? error.response.data.message
          : error.message,
    });
  }
};

export const facultyUpdateSupervisorProfile = (id, password, cfrmPassword, academicPos) => async (dispatch) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_APPLICATION_REQUEST,
    });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/supervisor/supervisorProfileList/${id}`, 
                                      {password, cfrmPassword, academicPos}, config);

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

export const facultyUpdateStudentProfile = (id, password, cfrmPassword, degreeLvl, dateJoined) => async (dispatch) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_APPLICATION_REQUEST,
    });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/student/studentProfileList/${id}`, 
                                      {password, cfrmPassword, degreeLvl, dateJoined}, config);

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

export const facultyUpdatePanelProfile = (id, password, cfrmPassword) => async (dispatch) => {
  try {
    dispatch({
      type: FACULTY_UPDATE_APPLICATION_REQUEST,
    });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/panel/panelProfileList/${id}`, 
                                      {password, cfrmPassword}, config);

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
      `${BASE_URL_2}api/faculty/facultyPanelRegistration`,
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
      `${BASE_URL_2}api/faculty/facultySupervisorRegistration`,
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
      `${BASE_URL_2}api/faculty/facultyStudentRegistration`,
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadAssignSupervision`, config);

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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadAssignSupervision/${id}`,
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadChooseStudent`, config);

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

export const facultyUpdateChooseStudent = (id, numAssignedSupervision, supervisorList) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_CHOOSE_STUDENT_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadChooseStudent/${id}`,{id, numAssignedSupervision, supervisorList},config);

    dispatch({
      type: FACULTY_CHOOSE_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_CHOOSE_STUDENT_FAIL,
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadEvaluateRPDApplication`, config);

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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadEvaluateRPDApplication/${id}`, {}, config);

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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadEvaluateRPDApplication2/${id}`, {dateScheduleRPD}, config);

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

export const facultyReadSubjectStudent = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadSubjectStudent`, config);

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

export const facultyUpdateSubjectStudent = (id, subjectA, subjectB) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_CHOOSE_STUDENT_REQUEST,
    });

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadSubjectStudent/${id}`,{id, subjectA, subjectB},config);

    dispatch({
      type: FACULTY_CHOOSE_STUDENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_CHOOSE_STUDENT_FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyReadEvaluateWCDApplication = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyReadEvaluateWCDApplication`, config);

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

export const facultyRejectWCDApplication = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadEvaluateWCDApplication/${id}`, {}, config);

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

export const facultyApproveWCDApplication = (id, dateScheduleWCD) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadEvaluateWCDApplication2/${id}`, {dateScheduleWCD}, config);

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

export const facultySetPRDate = (dateSetPR) => async (dispatch, getState) => {
  try {

    const {
      facultyLogin: { facultyInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultySetDatePR`,{dateSetPR},config);

    dispatch({
      type: FACULTY_PROGRESS_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: FACULTY_PROGRESS_REPORT__FAIL,
      payload:
        error.response 
        ? error.response.data.message
        : error.message,
    });
  }
};

export const facultyTerminateStudent = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadMonitorStudent/${id}`, {}, config);

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

export const facultyActiveStudent = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`${BASE_URL_2}api/faculty/facultyReadMonitorStudent2/${id}`, {}, config);

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

export const facultyViewStudentData = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${BASE_URL_2}api/faculty/facultyFetchDataStudent`, config);

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