import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Popup: React.FC = () => {
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 150, // Default width
  });

  useEffect(() => {
    const targetElement = document.querySelector('.msg-form__contenteditable') as HTMLElement;

    if (targetElement) {
      // Get the bounding rectangle of the target element
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY - 100, // Adjust to appear above the target element
        left: rect.left + window.scrollX,
        width: rect.width, // Set the popup width to match the textarea width
      });
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`, // Use the calculated width
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100000,
      }}
    >
      <p className=' font-bold from-stone-100'>This is your popup content!</p>
      <button className=' text-blue-700'>Close</button>
    </div>,
    document.body
  );
};

export default Popup;
