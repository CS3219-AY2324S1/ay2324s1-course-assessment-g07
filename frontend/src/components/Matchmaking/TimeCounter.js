import React from "react";
import "./TimeCounter.css"
import { useState, useEffect } from "react";
const TimeCounter = ( props ) => {
    const {waitingTime} = props;
    const radius = 40;
    const [time, setTime] = useState(waitingTime);

    useEffect(() => {
        // Define a function to update the timer every second
        const timer = setInterval(() => {
            // Check if the time has reached 0, and if not, decrement it by 1
            if (time > 0) {
            setTime(time - 1);
            }
        }, 1000); // Update the timer every 1000 milliseconds (1 second)

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, [time]);

    const circumference = 2 * Math.PI * radius; // Calculate the circumference

    const strokeDashOffset = circumference - (circumference * time) / waitingTime; // Calculate stroke-dashoffset


    return (<div className="time-counter">
        <div className="time-counter-circle">
            <svg>
                <circle cx={radius} cy={radius} r={radius}></circle>
                <circle cx={radius} cy={radius} r={radius} style={{ 
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashOffset,
                    transition: "stroke-dashoffset 1s linear", 
                     }}></circle>
                
            </svg>
            <div className="time-counter-value">
                {time}
            </div> 
        </div>


    </div>);
}

export default TimeCounter;