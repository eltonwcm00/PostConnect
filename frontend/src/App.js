import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyLogin from './screens/FacultyLogin/FacultyLogin';
import LandingPage from './screens/FacultyLogin/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/facultyLogin"  element={<FacultyLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
