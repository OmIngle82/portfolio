import React from "react";

const SolarSystem = () => {
  return (
    <div className="solar-system-container relative z-20">
      <div className="solar-system">
        <div className="sun"></div>
        <div className="earth-orbit">
          <div className="earth">
            <div className="moon-orbit">
              <div className="moon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
