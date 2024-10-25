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
      style={{
        width: '30px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        lineHeight: '44px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      onClick={togglePopup}
    >
      <img
        src={image}
        alt="Icon"
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'contain',
          verticalAlign: 'middle',
          display: showPopup ? 'none' : 'block'
        }}
      />
      {showPopup && (
        <div ref={popupRef}>
          <Popup />
        </div>
      )}
    </div>
  );
}

export default NewIcon;
