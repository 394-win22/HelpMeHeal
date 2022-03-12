import React from 'react';
import './ProgressBar.css';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import Grow from '@mui/material/Grow';

const ProgressBar = ({ steps, phase, currentDay, data, phaseEndDay, isMobile, onPhaseClick, surgeryType }) => {
    const complete = currentDay + phaseEndDay[phase - 1] >= phaseEndDay[Object.entries(phaseEndDay).length];
    return (
        <div>
            {complete && <h1>Congratulations! You have completed recovery!</h1>}
            <div className="progress-container">
                <ul className="progress-indicator" style={{ alignItems: isMobile ? "center" : "center" }}>
                    {steps.map((step) => 
                    (
                        <li
                            onClick={phase - 1 === step.index ? () => onPhaseClick(phase, currentDay, phaseEndDay) : null}
                            key={step.index}
                            data-cy={`cy${phase - 1 === step.index ? 'Active' : 'Inactive'}`}
                            className={`
                ${"progress-step"}
                ${phase - 1 === step.index ? 'active' : 'inactive'}
                ${isMobile ? "mobile" : "default"}
                ${(phase - 1 > step.index || complete) ? 'complete' : 'incomplete'}
            `}
                        >
                            <span className="step-number">{step.index + 1}</span>
                            <h3>{step.label}</h3>
                            <p className="phase-desc">{data["surgery"][surgeryType]["phases"][step.index + 1]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ProgressBarZoomed = ({ currentDay, phase, totalDays, onPhaseClick, isMobile, phaseEndDay }) => {
    const complete = currentDay + phaseEndDay[phase - 1] >= phaseEndDay[Object.entries(phaseEndDay).length];
    return (
        <div>
            {complete ?
                <h1>Congratulations! You have completed recovery!</h1> :
                <h3 data-cy="cyDaysComplete" style={{ color: "rgb(155, 11, 11)" }}>{currentDay}/{totalDays} days complete in this phase</h3>
            }
            <Box sx={{ mr: '25%', ml: '25%' }}>
                <LinearProgress color='error' variant='determinate' value={complete ? 100 : Math.floor((currentDay / totalDays) * 100)} />
            </Box>
            <ul className='progress-indicator'>
                <li className={`progress-step ${complete ? 'complete' : 'active'} ${isMobile ? "mobile" : "default"} zoomed`} style={{
                    display: "grid",
                    gridTemplateColumns: "150px",
                    gridTemplateRows: "70px 50px",
                    justifyItems: "center",
                    alignItems: "center",
                    position: "relative"
                }}
                    onClick={onPhaseClick}
                >
                    <span className='step-number'>{phase}</span>
                    <h3>Phase {phase}</h3>
                </li>
            </ul>
        </div >
    );
}

//TODO: add iterable as an argument and map it
const ProgressIndicator = ({ phase, currentDay, phaseEndDay, isMobile, setZoom, zoom, data, surgeryType }) => {
    //const [isZoom, setZoom] = useState(false);
    const steps = []

    for (const [key,] of Object.entries(phaseEndDay)) {
        var dict = { index: key - 1, label: 'Phase ' + key }
        steps.push(dict)
    }
    const totalDays = phase > 1 ? phaseEndDay[phase] - phaseEndDay[phase - 1] : phaseEndDay[phase];

    const currentDayPhase = phase > 1 ? currentDay - phaseEndDay[phase - 1] : currentDay;
    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div>
                {zoom || isMobile ? <ProgressBarZoomed totalDays={totalDays} phase={phase} isMobile={isMobile} currentDay={currentDayPhase} phaseEndDay={phaseEndDay} onPhaseClick={() => setZoom(!zoom)} /> :
                    <ProgressBar steps={steps} data={data} surgeryType={surgeryType} phase={phase} currentDay={currentDayPhase} isMobile={isMobile} phaseEndDay={phaseEndDay} onPhaseClick={() => setZoom(!zoom)} />}
            </div>
        </Grow>
    );


}

export default ProgressIndicator;