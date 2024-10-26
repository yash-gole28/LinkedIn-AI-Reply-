import React, { useState } from 'react';
import image from '@/assets/Frame.svg';
import Popup from './Popup';

const NewIcon: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

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
            onClick={() => setShowPopup(false)} // Close popup on overlay click
          />

          {/* Popup */}
          <div className="absolute z-50">
            <Popup togglePopup={setShowPopup}/>
          </div>
        </>
      )}
    </div>
  );
};

export default NewIcon;
