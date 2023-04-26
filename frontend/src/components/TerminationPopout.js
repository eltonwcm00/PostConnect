import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import { studentLogout } from "../actions/studentAction";
import { Container, Toast, ToastContainer, Button, Row, Col } from 'react-bootstrap';

const TerminationPopout = ({ message }) => {
  
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [statusToastPostion, setStatusToastPosition] = useState('middle-center');
    const [showToast, setShowToast] = useState(true);
    const studentLoginState = useSelector((state) => state.studentLogin);
    const { studentInfo } = studentLoginState;

    const toggleShowA = () => setShowToast(!showToast);

    const handleLogout = () => {
        if (window.confirm("Are you sure?")) { 
          dispatch(studentLogout());
        }
    }

    useEffect(() => {
        if (!studentInfo) {
          navigate('/');
        }
    }, [navigate, studentInfo]);

    return (
        
        <Toast className="toast" onClose={toggleShowA} show={showToast} animation={true} position={statusToastPostion} style={{margin: '0 auto'}}>
            <Toast.Body>
                <Row>
                    <Col>   
                        {message}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>   
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>   
                    </Col>
                </Row>
                
            </Toast.Body>
        </Toast>
    
    )
}

export default TerminationPopout
