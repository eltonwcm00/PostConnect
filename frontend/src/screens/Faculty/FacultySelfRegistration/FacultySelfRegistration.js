import React , { useState }from 'react'
import { useDispatch, useSelector } from "react-redux";
import { facultySelfRegistration} from "../../../actions/facultyAction";
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from "../../../components/ErrorMessage";

const FacultySelfRegistration = () => {

    const dispatch = useDispatch();

    const facultySelfRegistrationState = useSelector((state) => state.facultyRegistration);
    const { facultyInfo, successMsg, error } = facultySelfRegistrationState;

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(facultySelfRegistration(username, password));
    };

    return (
        <div>
        {successMsg && <SuccessMessage variant="success">{facultyInfo.successMessage}</SuccessMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <form>
            <h1>Faculty Account Registration</h1>
            <label><b>Username</b></label>
            <input type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => setUserName(e.target.value)}
            />
            <label><b>Password</b></label>
            <input  type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
            />
            <button type="submit" onClick={submitHandler}>Register</button>
        </form>
        </div>
    )
}

export default FacultySelfRegistration
