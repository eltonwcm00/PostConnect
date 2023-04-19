import React, { useEffect, useState } from "react";
import StudentTemplate from "../../../components/StudentTemplate";
import Notification from "../../../components/Notification";

import './StudentHomepage.css';

const StudentHomepage = () => {

  return (
    <StudentTemplate>
      <Notification />
    </StudentTemplate>
  )
}

export default StudentHomepage
