import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyLogin from './screens/Faculty/FacultyLogin/FacultyLogin';
import RegisterPanel from './screens/Faculty/FacultyRegister/RegisterPanel';
import RegisterSupervisor from './screens/Faculty/FacultyRegister/RegisterSupervisor';
import RegisterStudent from './screens/Faculty/FacultyRegister/RegisterStudent';
import LandingPage from './screens/LandingPage/LandingPage';
import FacultyHomepage from './screens/Faculty/FacultyHomepage/FacultyHomepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/facultyLogin" element={<FacultyLogin />}/>
        <Route path="/facultyHomepage" element={<FacultyHomepage />}/>
        <Route path="/facultyPanelRegistration" element={<RegisterPanel />}/>
        <Route path="/facultySupervisorRegistration" element={<RegisterSupervisor />}/>
        <Route path="/facultyStudentRegistration" element={<RegisterStudent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
