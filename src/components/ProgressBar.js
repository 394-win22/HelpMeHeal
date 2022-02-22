import React, { useState } from 'react';
import './ProgressBar.css';




const ProgressBar = ({setActiveIndex, steps, phase, currentDay, phaseEndDay, isMobile, onPhaseClick}) => {
    
    return (
        <div className="progress-container">
            <ul className="progress-indicator">
                {steps.map((step) => (
                    <li
                        onClick = { phase - 1 === step.index ? () => onPhaseClick(phase, currentDay, phaseEndDay): null}
                        key={step.index}
                        className={`
            ${isMobile ? "progress-step mobile" : "progress-step"}
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
};

const ProgressBarZoomed =  ({currentDay, phase, totalDays, isMobile, onPhaseClick }) => {
   
    const steps = [Number(phase),Number(phase)+1];
    console.log("TruePhase: "+steps);

    return (
        <div className="progress-container">
            <ul className="progress-indicator">
                {steps.map((step) => (
                    <li
                        onClick = { phase === step ? 
                        () => onPhaseClick(phase, currentDay): null}
                        key={step}
                        className={`
            ${isMobile ? "progress-step mobile" : "progress-step"}
            ${Number(phase) === step ? 'active' : 'inactive'}
            ${Number(phase) > step ? 'complete' : 'incomplete'}
          `}
                    >
                        <span className="step-number">{step}</span>
                        <h3>Phase {step}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//TODO: add iterable as an argument and map it
const ProgressIndicator = ({setActiveIndex, currentDay, phaseEndDay, isMobile }) => {
    const[isZoom,setZoom] = useState(false);
    const steps = []
    let phase;

    const onPhaseClick = ( phase, currentDay, phaseEndDay ) => {
        const totalDays = phaseEndDay[phase];
        console.log("phase: "+phase);
        console.log("tot: "+totalDays);
        setZoom(!isZoom);
        
    };

    for (const [key, value] of Object.entries(phaseEndDay)) {
        if (currentDay <= value) {
            phase = key;
            //this line will cause error 
            setActiveIndex(phase)
            break;
        }
    }

    for (const [key,] of Object.entries(phaseEndDay)) {
        var dict = { index: key - 1, label: 'Phase ' + key }
        steps.push(dict)
        
    }
   

    return(
        <div>
            {isZoom ? <ProgressBarZoomed setActiveIndex={setActiveIndex} phase={phase} currentDay={currentDay} phaseEndDay={phaseEndDay} isMobile={isMobile} onPhaseClick={onPhaseClick}  /> : 
            <ProgressBar setActiveIndex={setActiveIndex} steps={steps} phase={phase} currentDay={currentDay} phaseEndDay={phaseEndDay} isMobile={isMobile} onPhaseClick={onPhaseClick} />}
        </div>
    );

    
}

export default ProgressIndicator;