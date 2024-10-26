import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import GenerateBtn from '@/assets/Generate-btn.png';

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
      className={`absolute z-[100000] bg-white border border-[#adadad] rounded-lg shadow-xl`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`, // Use the calculated width
      }}
    >
      <div className="p-2">
        <img className='h-8' src={GenerateBtn} alt='Generate' />
      </div>
      {/* <p className='font-extrabold'>This is your popup content!</p> */}
    </div>,
    document.body
  );
};

export default Popup;
