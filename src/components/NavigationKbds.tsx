import React from 'react';

const NavigationKbds = ({ btns }: { btns: [string, string, string, string]}) => (
  <div className="flex flex-col justify-center items-center">
    <div className="flex justify-center">
      <kbd className="kbd">{btns[0]}</kbd>
    </div>
    <div className="flex justify-center">
      <kbd className="kbd">{btns[1]}</kbd>
      <kbd className="kbd">{btns[2]}</kbd>
      <kbd className="kbd">{btns[3]}</kbd>
    </div>
  </div>
);

export default NavigationKbds;