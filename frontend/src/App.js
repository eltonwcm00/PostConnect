import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyLogin from './screens/FacultyLogin/FacultyLogin';
import FacultyRegister from './screens/FacultyRegister/FacultyRegister';
import LandingPage from './screens/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/facultyLogin" element={<FacultyLogin />}/>
        <Route path="/facultyRegister" element={<FacultyRegister />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
