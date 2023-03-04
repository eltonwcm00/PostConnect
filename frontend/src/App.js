import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyLogin from './screens/Faculty/FacultyLogin/FacultyLogin';
import RegisterPanel from './screens/Faculty/FacultyRegister/RegisterPanel';
import LandingPage from './screens/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/facultyLogin" element={<FacultyLogin />}/>
        <Route path="/facultyPanelRegistration" element={<RegisterPanel />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
