import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { supervisorSupervisingStudList } from "../../../actions/supervisorAction";
import axios from "axios";
import { BASE_URL_2 } from "../../../urlPath";
import SupervisorTemplate from "../../../components/SupervisorTemplate";

const SupervisorViewProfile = () => {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const supervisorLoginState = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLoginState;
  const supervisorProfileState = useSelector((state) => state.supervisorProfile);
  const { supervisorProfileList } = supervisorProfileState;

  useEffect(() => {
    if (!supervisorInfo) {
      navigate('/');
    }
  }, [navigate, supervisorInfo]);

  const { token } = useSelector((state) => state.supervisorLogin.supervisorInfo || {});

  const [name, setName] = useState();
  const [academicPos, setAcademicPos] = useState();
  const [numSupervision, setNumSupervision] = useState();
  const [numAssignedSupervision, setNumAssignedSupervision] = useState();

  useEffect(() => {
    const fetching = async () => {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${BASE_URL_2}api/supervisor/supervisorViewOwnProfile`,
          config
        );

        setName(data.usernameSup);
        setAcademicPos(data.academicPos);
        
        if (data && data.numSupervision) {
            setNumSupervision(data.numSupervision);
        } else {
            setNumSupervision(undefined);
        }

        if (data && data.numAssignedSupervision) {
            setNumAssignedSupervision(data.numAssignedSupervision);
        } else {
            setNumAssignedSupervision(undefined);
        }
      }
    };
    fetching();
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(supervisorSupervisingStudList());
  }, []);

  const dataColor = {
    color: "dimgrey",
  };

  const dataElseColor = {
    color: "red",
  }

  const dataDesc = {
    fontWeight: "bold",
    marginRight: "10px",
  }

  return (
    <>
      <SupervisorTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5', paddingBottom: '20px'}}>
            <Col className="mt-3">
              <Row>
                <Col xs={3}>
                  <img className="profileCentering roundImg" src="/image/teacher.png" alt="React Image" height={90} width={90} />
                </Col>
                <Col>
                  <div className="mt-4">
                    <span className="profileText">{`Hi, I am ${name}`}</span>
                    <span className="profileText mt-2" style={{fontSize: '12px'}}>
                      <span className="profileText profileTextDot"></span>
                      Online
                    </span>
                  </div>
  
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="mt-4">
                <h4 className="profileSummaryHeader">Summary</h4>
                <span className="profileText mt-4">
                  <span style={dataDesc}>Academic Position: </span>
                  <span style={dataColor}>{academicPos}</span>
                </span>
                <span className="profileText">
                  <span style={dataDesc}>Allowed Number of Supervision:</span>
                    {numSupervision ? 
                      <span style={dataColor}>
                        {numSupervision}
                      </span> : 
                      <span style={dataElseColor}>Have not been assigned</span>}
                  </span>
                <span className="profileText">
                  <span style={dataDesc}>Remaining Number of Supervision:</span>
                    {numAssignedSupervision ?
                    <span style={dataColor}>
                        {numAssignedSupervision}
                    </span> :
                    <span style={dataElseColor}>0</span>}
                </span>
                <div className="mt-2">
                    <span style={dataDesc} className="profileText">Currently, I am supervising, </span>
                    <ul className="mt-1 profileText" style={{display: 'inline-block', fontSize: '15px'}}>
                        {
                            supervisorProfileList && supervisorProfileList.map((list) => (
                                <div key={list._id}>
                                    <li>{list.usernameStud}</li>
                                </div>
                            ))
                        }
                    </ul> 
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </SupervisorTemplate>
    </>
  )
}

export default SupervisorViewProfile
