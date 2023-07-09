import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { BASE_URL_2 } from "../../../urlPath";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { panelProfile } from "../../../actions/panelAction";
import PanelTemplate from "../../../components/PanelTemplate";

const PanelViewProfile = () => {
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [numRPD, setNumRPD] = useState();
  const [numWCD, setNumWCD] = useState();
  const [numPR, setNumPR] = useState();

  const panelLoginState = useSelector((state) => state.panelLogin);
  const { panelInfo } = panelLoginState;
  const panelProfileState = useSelector((state) => state.panelProfile);
  const { panelProfileList } = panelProfileState;

  useEffect(() => {
    if (!panelInfo) {
      navigate('/');
    }
  }, [navigate, panelInfo]);

  useEffect(() => {
    dispatch(panelProfile());
  }, []);

  useEffect(() => {
    const fetching = async () => {
        const { data } = await axios.get(`${BASE_URL_2}api/panel/panelCountEvaluatedRPD`);
        setNumRPD(data);
    };
    fetching();
  }, []);

  useEffect(() => {
    const fetching = async () => {
        const { data } = await axios.get(`${BASE_URL_2}api/panel/panelCountEvaluatedWCD`);
        setNumWCD(data);
    };
    fetching();
  }, []);

  useEffect(() => {
    const fetching = async () => {
        const { data } = await axios.get(`${BASE_URL_2}api/panel/panelCountEvaluatedPR`);
        setNumPR(data);
    };
    fetching();
  }, []);
  
  return (
    <>
      <PanelTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5', paddingBottom: '20px'}}>
            {
              panelProfileList && panelProfileList.map((list) => (
                <Col className="mt-3">
                  <Row>
                    <Col xs={3}>
                      <img className="profileCentering roundImg" src="/image/marking.png" alt="React Image" height={90} width={90} />
                    </Col>
                    <Col>
                      <div key={list._id} className="mt-4">
                        <span className="profileText">{`Hi, I am ${list.usernamePanel}`}</span>
                        <span className="profileText mt-2" style={{fontSize: '12px'}}>
                          <span className="profileText profileTextDot"></span>
                          Online
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))
            }
            <Col>
              <div className="mt-4">
                <span className="profileText">You have processed the result for,</span>
                <ul className="mt-2 profileText" style={{display: 'inline-block', fontSize: '12px'}}>
                  <li>{`Research Proposal Defence : ${numRPD}`}</li>
                  <li>{`Work Completion Defence : ${numWCD}`}</li>
                  <li>{`Progress Report : ${numPR}`}</li>
                </ul> 
              </div>
            </Col>
          </Row>
        </Container>
      </PanelTemplate>
    </>
  )
}

export default PanelViewProfile
