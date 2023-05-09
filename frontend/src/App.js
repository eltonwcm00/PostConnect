import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './screens/LandingPage/LandingPage';
import Error404 from './screens/Error404/Error404';

import FacultyLogin from './screens/Faculty/FacultyLogin/FacultyLogin';
import FacultyHomepage from './screens/Faculty/FacultyHomepage/FacultyHomepage';
import FacultyViewOwnProfile from './screens/Faculty/FacultyProfile/FacultyViewProfile';
import FacultyViewProfileID from './screens/Faculty/FacultyProfile/FacultyViewProfileID';
import RegisterHomepage from './screens/Faculty/FacultyRegister/RegisterHomepage';
import RegisterPanel from './screens/Faculty/FacultyRegister/RegisterPanel';
import RegisterSupervisor from './screens/Faculty/FacultyRegister/RegisterSupervisor';
import RegisterStudent from './screens/Faculty/FacultyRegister/RegisterStudent';
import FacultyAssignNumSupervisor from './screens/Faculty/FacultyAssignNumSupervisor/FacultyAssignNumSup';
import FacultyAssignNumSupID from './screens/Faculty/FacultyAssignNumSupervisor/FacultyAssignNumSupID';
import FacultyEvaluateRPDApplication from './screens/Faculty/FacultyEvaluateRPDApplication/FacultyEvaluateRPDApplication';
import FacultyEvaluateRPDApplicationID from './screens/Faculty/FacultyEvaluateRPDApplication/FacultyEvaluateRPDApplicationID';
import FacultyChooseStud from './screens/Faculty/FacultyChooseStudent/FacultyChooseStud';
import FacultySubjectRegistration from './screens/Faculty/FacultyMiscellaneous/FacultySubjectRegistration';
import FacultySubjectRegistrationID from './screens/Faculty/FacultyMiscellaneous/FacultySubjectRegistrationID';
import FacultyEvaluateWCDApplication from './screens/Faculty/FacultyEvaluateWCDApplication/FacultyEvaluateWCDApplication';
import FacultyEvaluateWCDApplicationID from './screens/Faculty/FacultyEvaluateWCDApplication/FacultyEvaluateWCDApplicationID';
import FacultyMonitorStud from './screens/Faculty/FacultyMonitorStudent/FacultyMonitorStud';

import StudentLogin from './screens/Student/StudentLogin/StudentLogin';
import StudentHomepage from './screens/Student/StudentHompage/StudentHomepage';
import StudentViewProfile from './screens/Student/StudentProfile/StudentViewProfile';
import StudentRPDRequest from './screens/Student/StudentRPDRequest/StudentRPDRequest';
import StudentMeetingLog from './screens/Student/StudentMeetingLog/StudentMeetingLog';
import StudentWCDRequest from './screens/Student/StudentWCDRequest/StudentWCDRequest';
import StudentSubmitPR from './screens/Student/StudentSubmitPR/StudentSubmitPR';

import SupervisorLogin from './screens/Supervisor/SupervisorLogin/SupervisorLogin';
import SupervisorHomepage from './screens/Supervisor/SupervisorHomepage/SupervisorHomepage';
import SupervisorViewProfile from './screens/Supervisor/SupervisorProfile/SupervisorViewProfile';
import SupervisorViewMeetingLog from './screens/Supervisor/SupervisorViewMeetingLog/SupervisorViewMeetingLog';
import SupervisorViewMeetingLogID from './screens/Supervisor/SupervisorViewMeetingLog/SupervisorViewMeetingLogID';
import SupervisorViewRPD from './screens/Supervisor/SupervisorViewRPD/SupervisorViewRPD';
import SupervisorViewWCD from './screens/Supervisor/SupervisorViewWCD/SupervisorViewWCD';
import SupervisorEvaluatePR from './screens/Supervisor/SupervisorEvaluatePR/SupervisorEvaluatePR';
import SupervisorEvaluatePRID from './screens/Supervisor/SupervisorEvaluatePR/SupervisorEvaluatePRID';
import SupervisorViewPR from './screens/Supervisor/SupervisorViewPR/SupervisorViewPR';

import PanelLogin from './screens/Panel/PanelLogin/PanelLogin';
import PanelHomepage from './screens/Panel/PanelHomepage/PanelHomepage';
import PanelViewProfile from './screens/Panel/PanelProfile/PanelViewProfile';
import PanelEvaluateRPD from './screens/Panel/PanelEvaluateRPD/PanelEvaluateRPD';
import PanelEvaluateRPDID from './screens/Panel/PanelEvaluateRPD/PanelEvaluateRPDID';
import PanelEvaluateWCD from './screens/Panel/PanelEvaluateWCD/PanelEvaluateWCD';
import PanelEvaluateWCDID from './screens/Panel/PanelEvaluateWCD/PanelEvaluateWCDID';
import PanelEvaluatePR from './screens/Panel/PanelEvaluatePR/PanelEvaluatePR';
import PanelEvaluatePRID from './screens/Panel/PanelEvaluatePR/PanelEvaluatePRID';
import FacultyMonitorStudID from './screens/Faculty/FacultyMonitorStudent/FacultyMonitorStudID';

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

        <Route exact path="/facultyViewProfile" element={<FacultyViewOwnProfile />}/>
        <Route exact path="/panelProfileList/:id" element={<FacultyViewProfileID />}/>
        <Route exact path="/supervisorProfileList/:id" element={<FacultyViewProfileID />}/>
        <Route exact path="/studentProfileList/:id" element={<FacultyViewProfileID />}/>

        <Route exact path="/facultyRegister" element={<RegisterHomepage />}/>
        <Route exact path="/facultyPanelRegistration" element={<RegisterPanel />}/>
        <Route exact path="/facultySupervisorRegistration" element={<RegisterSupervisor />}/>
        <Route exact path="/facultyStudentRegistration" element={<RegisterStudent />}/>
        <Route exact path="/facultyAssignNumSupervisor" element={<FacultyAssignNumSupervisor />}/>
        <Route exact path="/facultyAssignNumSupervisor/:id" element={<FacultyAssignNumSupID />}/>
        <Route exact path="/facultyEvaluateRPDApplication" element={<FacultyEvaluateRPDApplication />}/>
        <Route exact path="/facultyEvaluateRPDApplication/:id" element={<FacultyEvaluateRPDApplicationID />}/>
        <Route exact path="/facultyReadChooseStudent" element={<FacultyChooseStud />}/>
        <Route exact path="/miscellaneous" element={<FacultySubjectRegistration />}/>
        <Route exact path="/miscellaneous/:id" element={<FacultySubjectRegistrationID />}/>
        <Route exact path="/facultyEvaluateWCDApplication" element={<FacultyEvaluateWCDApplication />}/>
        <Route exact path="/facultyEvaluateWCDApplication/:id" element={<FacultyEvaluateWCDApplicationID />}/>
        <Route exact path="/facultyMonitorStudent" element={<FacultyMonitorStud />}/>
        <Route exact path="/facultyMonitorStudent/:id" element={<FacultyMonitorStudID />}/>

        <Route exact path="/studentViewProfile" element={<StudentViewProfile />}/>
        <Route exact path="/studentRequestRPD" element={<StudentRPDRequest />}/>
        <Route exact path="/studentSubmitMeetingLog" element={<StudentMeetingLog />}/>
        <Route exact path="/studentRequestWCD" element={<StudentWCDRequest />}/>
        <Route exact path="/studentSubmitPR" element={<StudentSubmitPR />}/>

        <Route exact path="/supervisorViewProfile" element={<SupervisorViewProfile />}/>
        <Route exact path="/supervisorViewMeetingLog" element={<SupervisorViewMeetingLog />}/>
        <Route exact path="/supervisorViewMeetingLog/:id" element={<SupervisorViewMeetingLogID />}/>
        <Route exact path="/supervisorViewRPD" element={<SupervisorViewRPD />}/>
        <Route exact path="/supervisorViewWCD" element={<SupervisorViewWCD />}/>
        <Route exact path="/supervisorEvaluatePR" element={<SupervisorEvaluatePR />}/>
        <Route exact path="/supervisorEvaluatePR/:id" element={<SupervisorEvaluatePRID />}/>
        <Route exact path="/supervisorViewPR" element={<SupervisorViewPR />}/>

        <Route exact path="/panelViewProfile" element={<PanelViewProfile />}/>
        <Route exact path="/panelEvaluateRPD" element={<PanelEvaluateRPD />}/>
        <Route exact path="/panelEvaluateRPD/:id" element={<PanelEvaluateRPDID />}/>
        <Route exact path="/panelEvaluateWCD" element={<PanelEvaluateWCD />}/>
        <Route exact path="/panelEvaluateWCD/:id" element={<PanelEvaluateWCDID />}/>
        <Route exact path="/panelEvaluatePR" element={<PanelEvaluatePR />}/>
        <Route exact path="/panelEvaluatePR/:id" element={<PanelEvaluatePRID />}/>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
