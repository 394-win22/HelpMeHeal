import React, { useState } from 'react';
import './ProgressBar.css';
import calculateDay from '../utilities/calculateday';

const steps = [
    {
        index: 0,
        label: 'Phase 1',
    },
    {
        index: 1,
        label: 'Phase 2',
    },
    {
        index: 2,
        label: 'Phase 3',
    },
    {
        index: 3,
        label: 'Phase 4',
    },
    {
        index: 4,
        label: 'Phase 5',
    },
    {
        index: 5,
        label: 'Phase 6',
    }

];

//TODO: add iterable as an argument and map it
const ProgressIndicator = ({ activeIndex, setActiveIndex, startdate, phaseEndDay }) => {
    //we have to change useState to use a function of
    //day number (day 5 / 40 = phase 2)

    // this part move to User.js for common use
    // const [activeIndex, setActiveIndex] = useState(2);
    const steps = []

    let days = calculateDay(startdate);
    let phase;
    //phaseEndDay[0] is empty. Don't know why
    for (let i = 1; i < phaseEndDay.length; i++) {
        if (days <= phaseEndDay[i]) {
            phase = i;
            break;
        }
    }
    setActiveIndex(phase)
    for (let i = 1; i < phaseEndDay.length; i++) {
        var dict = { index: i - 1, label: 'Phase' + i }
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