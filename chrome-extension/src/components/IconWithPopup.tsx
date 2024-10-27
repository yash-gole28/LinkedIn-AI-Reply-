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
        onClick={togglePopup} // Only clicking on the icon toggles the popup
      />

      {showPopup && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closePopup} // Close popup on overlay click
            role="presentation" 
            aria-hidden="true"
          />

          {/* Popup */}
          <div className="absolute z-50">
            <Popup togglePopup={closePopup} />
          </div>
        </>
      )}
    </div>
  );
};

export default IconWithPopup;
