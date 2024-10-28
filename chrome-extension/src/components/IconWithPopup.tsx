import React, { useState } from 'react';
import image from '@/assets/Frame.svg';
import Popup from './Popup';

const IconWithPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative w-9 h-full flex items-center cursor-pointer overflow-hidden">
      {/* Icon that toggles the popup */}
      <img
        src={image}
        alt="Icon"
        className={`w-9 h-9 object-contain ${showPopup ? 'hidden' : 'block'}`}
        onClick={togglePopup}
      />

      {showPopup && (
        <>
          {/* Popup */}
          <div className="absolute z-[999]">
            <Popup togglePopup={closePopup} />
          </div>
        </>
      )}
    </div>
  );
};

export default IconWithPopup;
