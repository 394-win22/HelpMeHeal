import React, { useState } from 'react';
import './ProgressBar.css';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

const ProgressBar = ({steps, phase, currentDay, phaseEndDay, isMobile, onPhaseClick}) => {
    const complete = currentDay+phaseEndDay[phase-1] >= phaseEndDay[Object.entries(phaseEndDay).length];
    return (
        <div>
            {complete && <h1>Congratulations! You have completed recovery!</h1>}
            <div className="progress-container">
                <ul className="progress-indicator">
                    {steps.map((step) => (
                        <li
                            onClick = { phase - 1 === step.index ? () => onPhaseClick(phase, currentDay, phaseEndDay): null}
                            key={step.index}
                            className={`
                ${isMobile ? "progress-step mobile" : "progress-step"}
                ${phase - 1 === step.index ? 'active' : 'inactive'}
                ${(phase - 1 > step.index || complete) ? 'complete' : 'incomplete'}
            `}
                        >
                            <span className="step-number">{step.index + 1}</span>
                            <h3>{step.label}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ProgressBarZoomed =  ({currentDay, phase, totalDays, onPhaseClick, phaseEndDay }) => {
    const complete = currentDay+phaseEndDay[phase-1] >= phaseEndDay[Object.entries(phaseEndDay).length];
    return (
        <div>
            {complete ? 
                <h1>Congratulations! You have completed recovery!</h1> : 
                <h3 style={{color: "rgb(155, 11, 11)"}}>{currentDay}/{totalDays} days complete in this phase</h3>
            }
            <Box sx={{mr:'25%', ml:'25%'}}>        
                <LinearProgress color='error' variant='determinate' value={complete ? 100 : Math.floor((currentDay/totalDays)*100)} />
            </Box>
            <ul className='progress-indicator'>
                <li className={`progress-step ${complete ? 'complete' : 'active'} zoomed`}
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
const ProgressIndicator = ({setActiveIndex, currentDay, phaseEndDay, isMobile, setZoom, zoom }) => {
    //const [isZoom, setZoom] = useState(false);
    const steps = []
    let phase;

    for (const [key, value] of Object.entries(phaseEndDay)) {
        if (currentDay <= value) {
            phase = key;
            //this line will cause error 
            setActiveIndex(phase);
            break;
        }
        else {
            phase = Object.entries(phaseEndDay).length;
        }
    }

    for (const [key,] of Object.entries(phaseEndDay)) {
        var dict = { index: key - 1, label: 'Phase ' + key }
        steps.push(dict)
    }
    const totalDays = phase > 1 ? phaseEndDay[phase] - phaseEndDay[phase-1] : phaseEndDay[phase];
    
    const currentDayPhase = phase > 1 ? currentDay - phaseEndDay[phase-1] : currentDay;
   

    return(
        <div>
            {zoom ? <ProgressBarZoomed totalDays={totalDays} phase={phase} currentDay={currentDayPhase} phaseEndDay={phaseEndDay} onPhaseClick={() => setZoom(!zoom)} /> :
                <ProgressBar steps={steps} phase={phase} currentDay={currentDayPhase} phaseEndDay={phaseEndDay} isMobile={isMobile} onPhaseClick={() => setZoom(!zoom)} />}
        </div>
    );

    
}

export default ProgressIndicator;