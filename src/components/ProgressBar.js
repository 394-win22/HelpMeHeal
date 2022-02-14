import React, { useState } from 'react';
import './ProgressBar.css';

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
const ProgressIndicator = () => {
  //we have to change useState to use a function of 
  //day number (day 5 / 40 = phase 2)
	const [activeIndex, setActiveIndex] = useState(2);
	return (
    <div className="progress-container">
      <ul className="progress-indicator">
      {steps.map((step) => (
        <li
          key={step.index}
          className={`
            progress-step
            ${activeIndex === step.index ? 'active' : 'inactive'}
            ${activeIndex > step.index ? 'complete' : 'incomplete'}
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