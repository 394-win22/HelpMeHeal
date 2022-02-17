import React, { useState } from 'react';
import './ProgressBar.css';


//TODO: add iterable as an argument and map it
const ProgressIndicator = ({setActiveIndex, currentDay, phaseEndDay }) => {
   
    const steps = []

    let phase;
    
    for (const [key, value] of Object.entries(phaseEndDay)) {
        if (currentDay <= value) {
            phase = key;
            //this line will cause error 
            setActiveIndex(phase)
            break;
        }
    }

    for (const [key,] of Object.entries(phaseEndDay)) {
        var dict = { index: key - 1, label: 'Phase' + key }
        steps.push(dict)
    }

    return (
        <div className="progress-container">
            <ul className="progress-indicator">
                {steps.map((step) => (
                    <li
                        key={step.index}
                        className={`
            progress-step
            ${phase - 1 === step.index ? 'active' : 'inactive'}
            ${phase - 1 > step.index ? 'complete' : 'incomplete'}
          `}
                    >
                        <span className="step-number">{step.index + 1}</span>
                        <h3>{step.label}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProgressIndicator;