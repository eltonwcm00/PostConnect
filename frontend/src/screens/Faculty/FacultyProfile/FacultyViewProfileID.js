import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const FacultyViewProfileID = () => {
  
    const location = useLocation();
    const [url, setUrl] = useState(location.pathname);

    useEffect(() => {
        const segments = location.pathname.split('/');
        segments.pop();
        const pathname = segments.join('/');
        setUrl(pathname);
    }, [location.pathname]);
    
    const { id } = useParams();

    const [password, setPassword] = useState();
    const [cfrmPassword, setCfrmPassword] = useState("");

    const [fullnameStud, setFullNameStud] = useState();
    const [fullnameSup, setFullNameSup] = useState();
    const [fullnamePanel, setFullNamePanel] = useState();

    const [dateJoined, setDateJoined] = useState();
    const [degreeLvl, setDegreeLvl] = useState();
    const [academicPos, setAcademicPos] = useState();

    let executeURL;

    switch (url) {
        case "/panelProfileList": 
            executeURL = `http://localhost:5000/api/panel/panelProfileList/${id}`;
            break;
        case "/supervisorProfileList": 
            executeURL = `http://localhost:5000/api/supervisor/supervisorProfileList/${id}`;
            break;
        case "/studentProfileList": 
            executeURL = `http://localhost:5000/api/student/studentProfileList/${id}`; 
            break;
        default:
            executeURL = "";
            break;
    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(executeURL);
            
            setPassword(data.password);

            setFullNameStud(data.usernameStud || "");
            setFullNameSup(data.usernameSup || "");
            setFullNamePanel(data.usernamePanel || "");

            setDateJoined(data.password || "");
            setDegreeLvl(data.degreeLvl || "");

            setAcademicPos(data.academicPos || "");
            
            console.log(data);
        };
        fetching();
    }, [executeURL]);

    return (
        <div>
            {console.log(url)}
            <div>
              <span>{fullnameStud}</span>
            </div>
            <div>
              <span>{fullnameSup}</span>
            </div>
        </div>
    )
}

export default FacultyViewProfileID
