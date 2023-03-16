import React, { useState } from 'react';
import './accordions.css'

const Accordion = ({ title, contentBlock }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title accordion-item-w" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className="accordion-content">
          {contentBlock}
        </div>
      )}
    </div>
  );
};

export default Accordion;
