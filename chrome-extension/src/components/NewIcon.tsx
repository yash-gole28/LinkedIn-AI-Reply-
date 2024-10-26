import React, { useState, useEffect, useRef } from 'react';
import image from '@/assets/Frame.svg';
import Popup from './Popup';

const NewIcon: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setShowPopup(!showPopup);

  // Close popup if click is outside
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup]);

  return (
    <div
      className={`w-9 h-full flex items-center line-height[44px] cursor-pointer overflow-hidden changeBg`}
      onClick={togglePopup}
    >
      <img
        src={image}
        alt="Icon"
        className={`w-9 h-9 object-contain vertical-align-middle ${showPopup ? 'hidden' : 'block'}`}
      />
      {showPopup && (
        <div ref={popupRef}>
          <Popup />
        </div>
      )}
    </div>
  );
};

export default NewIcon;
