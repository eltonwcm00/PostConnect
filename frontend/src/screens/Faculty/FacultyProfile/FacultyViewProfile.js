import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyViewOwnProfile } from "../../../actions/facultyAction";
import FacultyTemplate from "../../../components/FacultyTemplate";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";
import "./FacultyProfile.css"

const FacultyViewProfile = () => {
 
    let navigate = useNavigate();
    const [numPanel, setNumPanel] = useState();

    const dispatch = useDispatch();

    const facultyProfileState = useSelector((state) => state.facultyProfile);
    const { loading, error, fetchProfile, successMsg } = facultyProfileState;

    useEffect(() => {
      dispatch(facultyViewOwnProfile());
      console.log(fetchProfile);
    }, []);

    useEffect(() => {
      const fetching = async () => {
      
          const { data } = await axios.get('http://localhost:5000/api/faculty/facultyProfileCountPanel');

          setNumPanel(data);
      };
      fetching();
    }, []);

  return (
    <>
      <FacultyTemplate>
      <div className="form-title-desc-container">Welcome to PostConnect</div>
        <Container>
          <Row style={{backgroundColor: '#f5f5f5'}}>
          {
            fetchProfile && fetchProfile.map((list) => (
              <Col className="mt-3">
                <Row>
                  <Col xs={3}>
                    <img className="profileImg roundImg" src="/image/school.png" alt="React Image" height={90} width={90} />
                  </Col>
                  <Col>
                    <div key={list._id} className="mt-2">
                      <span className="profileText">{`Hi, I am ${list.userNameFac}`}</span>
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
            <Col style={{backgroundColor: 'green'}}>
            <div class="row" style={{backgroundColor: 'blue'}}>
              <div class="col">{numPanel}</div>
              <div class="col">Column</div>
              <div class="w-100"></div>
              <div class="col">Column</div>
              <div class="col">Column</div>
            </div>
            </Col>
          </Row>
        </Container>  
      </FacultyTemplate>
    </>
  )
}

export default FacultyViewProfile
