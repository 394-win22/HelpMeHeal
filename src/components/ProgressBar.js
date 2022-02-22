import React, { useState } from 'react';
import './ProgressBar.css';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

const ProgressBar = ({steps, phase, currentDay, phaseEndDay, isMobile, onPhaseClick}) => {
    
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

const ProgressBarZoomed =  ({currentDay, phase, totalDays, onPhaseClick }) => {
    return (
        <div>
            <h3 style={{color: "rgb(155, 11, 11)"}}>{currentDay}/{totalDays} days complete</h3>
            <Box sx={{mr:'25%', ml:'25%'}}>        
                <LinearProgress color='error' variant='determinate' value={Math.floor((currentDay/totalDays)*100)} />
            </Box>
            <ul className='progress-indicator'>
                <li className='progress-step active zoomed'
                    onClick = {onPhaseClick}
                >
                    <span className='step-number'>{phase}</span>
                    <h3>Phase {phase}</h3>
                </li>
            </ul>
        </div>
   );
}

//TODO: add iterable as an argument and map it
const ProgressIndicator = ({setActiveIndex, currentDay, phaseEndDay, isMobile }) => {
    const[isZoom,setZoom] = useState(false);
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
        var dict = { index: key - 1, label: 'Phase ' + key }
        steps.push(dict)
    }
    const totalDays = phaseEndDay[phase];
   

    return(
        <div>
            {isZoom ? <ProgressBarZoomed totalDays={totalDays} phase={phase} currentDay={currentDay} phaseEndDay={phaseEndDay} onPhaseClick={() => setZoom(!isZoom)}  /> : 
            <ProgressBar steps={steps} phase={phase} currentDay={currentDay} phaseEndDay={phaseEndDay} isMobile={isMobile} onPhaseClick={() => setZoom(!isZoom)} />}
        </div>
    );

    
}

export default ProgressIndicator;