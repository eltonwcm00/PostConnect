import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './screens/LandingPage/LandingPage';

import FacultyLogin from './screens/Faculty/FacultyLogin/FacultyLogin';
import FacultyHomepage from './screens/Faculty/FacultyHomepage/FacultyHomepage';
import RegisterHomepage from './screens/Faculty/FacultyRegister/RegisterHomepage';
import RegisterPanel from './screens/Faculty/FacultyRegister/RegisterPanel';
import RegisterSupervisor from './screens/Faculty/FacultyRegister/RegisterSupervisor';
import RegisterStudent from './screens/Faculty/FacultyRegister/RegisterStudent';
import FacultyAssignNumSupervisor from './screens/Faculty/FacultyAssignNumSupervisor/FacultyAssignNumSup';
import FacultyAssignNumSupID from './screens/Faculty/FacultyAssignNumSupervisor/FacultyAssignNumSupID';

import StudentLogin from './screens/Student/StudentLogin/StudentLogin';
import StudentHomepage from './screens/Student/StudentHompage/StudentHomepage';

import SupervisorLogin from './screens/Supervisor/SupervisorLogin/SupervisorLogin';
import SupervisorHomepage from './screens/Supervisor/SupervisorHomepage/SupervisorHomepage';
import SupervisorChooseStud from './screens/Supervisor/SupervisorChooseStudent/SupervisorChooseStud';

import PanelLogin from './screens/Panel/PanelLogin/PanelLogin';
import PanelHomepage from './screens/Panel/PanelHomepage/PanelHomepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/facultyLogin" element={<FacultyLogin />}/>
        <Route path="/studentLogin" element={<StudentLogin />}/>
        <Route path="/supervisorLogin" element={<SupervisorLogin />}/>
        <Route path="/panelLogin" element={<PanelLogin />}/>

        <Route path="/facultyHomepage" element={<FacultyHomepage />}/>
        <Route path="/studentHomepage" element={<StudentHomepage />}/>
        <Route path="/supervisorHomepage" element={<SupervisorHomepage />}/>
        <Route path="/panelHomepage" element={<PanelHomepage />}/>

        <Route path="/facultyRegister" element={<RegisterHomepage />}/>
        <Route path="/facultyPanelRegistration" element={<RegisterPanel />}/>
        <Route path="/facultySupervisorRegistration" element={<RegisterSupervisor />}/>
        <Route path="/facultyStudentRegistration" element={<RegisterStudent />}/>
        <Route path="/facultyAssignNumSupervisor" element={<FacultyAssignNumSupervisor />}/>
        <Route path="/facultyAssignNumSupervisor/:id" element={<FacultyAssignNumSupID />}/>

        <Route path="/supervisorReadChooseStudent" element={<SupervisorChooseStud />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
