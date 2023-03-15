import React from 'react';
import {useSelector } from "react-redux";

const Error404 = () => {

  const facultyLogin = useSelector((state) => state.facultyLogin);
  const { facultyInfo } = facultyLogin;
  const supervisorLogin = useSelector((state) => state.supervisorLogin);
  const { supervisorInfo } = supervisorLogin;
  const panelLogin = useSelector((state) => state.panelLogin);
  const { panelInfo } = panelLogin;
  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;

  return (
    <div class="d-flex align-items-center justify-content-center vh-100" style={{fontFamily:'Montserrat', backgroundColor: '#071b63'}}>
        <div class="text-center" style={{color: 'white'}}>
            <h1 class="display-1 fw-bold">404</h1>
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
                The page you're looking for doesn't exist.
              </p>
            {
              facultyInfo ? (<a href="/facultyHomepage" class="btn btn-primary">Go Home</a>) 
              : supervisorInfo ? (<a href="/supervisorHomepage" class="btn btn-primary">Go Home</a>)
              : panelInfo ? (<a href="/panelHomepage" class="btn btn-primary">Go Home</a>)
              : studentInfo ? (<a href="/studentHomepage" class="btn btn-primary">Go Home</a>)
              : <a href="/" class="btn btn-primary">Login</a>
            }
        </div>
    </div>
  )
}

export default Error404
