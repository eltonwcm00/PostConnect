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
    <div className="d-flex align-items-center justify-content-center vh-100" style={{fontFamily:'Montserrat', backgroundColor: '#071b63'}}>
        <div className="text-center" style={{color: 'white'}}>
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
                The page you're looking for doesn't exist.
              </p>
            {
              facultyInfo ? (<a href="/facultyHomepage" className="btn btn-primary">Go Home</a>) 
              : supervisorInfo ? (<a href="/supervisorHomepage" className="btn btn-primary">Go Home</a>)
              : panelInfo ? (<a href="/panelHomepage" className="btn btn-primary">Go Home</a>)
              : studentInfo ? (<a href="/studentHomepage" className="btn btn-primary">Go Home</a>)
              : <a href="/" className="btn btn-primary">Login</a>
            }
        </div>
    </div>
  )
}

export default Error404
