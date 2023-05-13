import React, { useEffect, useState } from "react";
import './Clock.css'

const Clock = () => {
  
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        
        return function cleanup() {
            clearInterval(timerID);
        };
    })

    function tick() {
        setDate(new Date());
    }
    return (
    <>
     {/* <h4 className="mb-3 toast-title" style={{textAlign: 'left', marginLeft: '2em', marginTop: '2.5em'}}>Clock</h4> */}
     <div className="clock-container">
        {date.toLocaleTimeString()}
     </div>
    </>
  )
}

export default Clock
