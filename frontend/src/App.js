import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './screens/LandingPage/LandingPage';
import Error404 from './screens/Error404/Error404';

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
        <Route exact path="/facultyLogin" element={<FacultyLogin />}/>
        <Route exact path="/studentLogin" element={<StudentLogin />}/>
        <Route exact path="/supervisorLogin" element={<SupervisorLogin />}/>
        <Route exact path="/panelLogin" element={<PanelLogin />}/>

        <Route exact path="/facultyHomepage" element={<FacultyHomepage />}/>
        <Route exact path="/studentHomepage" element={<StudentHomepage />}/>
        <Route exact path="/supervisorHomepage" element={<SupervisorHomepage />}/>
        <Route exact path="/panelHomepage" element={<PanelHomepage />}/>

        <Route exact path="/facultyRegister" element={<RegisterHomepage />}/>
        <Route exact path="/facultyPanelRegistration" element={<RegisterPanel />}/>
        <Route exact path="/facultySupervisorRegistration" element={<RegisterSupervisor />}/>
        <Route exact path="/facultyStudentRegistration" element={<RegisterStudent />}/>
        <Route exact path="/facultyAssignNumSupervisor" element={<FacultyAssignNumSupervisor />}/>
        <Route exact path="/facultyAssignNumSupervisor/:id" element={<FacultyAssignNumSupID />}/>

        <Route exact path="/supervisorReadChooseStudent" element={<SupervisorChooseStud />}/>
        
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
