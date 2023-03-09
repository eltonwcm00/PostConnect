import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogout } from "../../actions/facultyAction";

const LandingPage = () => {

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const facultyLoginState = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLoginState;

  useEffect(() => {
      if (facultyInfo) {
        navigate("/");
      }
  }, [navigate, facultyInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(facultyLogout());
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
      {facultyInfo 
        ? <Button variant="primary" type="submit">
          Logout </Button> 
        : "Please log in"
      }
      </Form>
      {/* {facultyInfo.userNameFac} */}
    </div>
  )
}

export default LandingPage
