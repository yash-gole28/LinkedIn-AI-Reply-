import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import GenerateBtn from '@/assets/Generate-btn.png';
import ReGenerateBtn from '@/assets/regenerate.png';
import Insert from '@/assets/Insert.png';

interface PopupProps {
  togglePopup: (isOpen: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ togglePopup }) => {
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [positionCalculated, setPositionCalculated] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [buttonToggle, setButtonToggle] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleClick = () => {
    if (prompt.trim() !== "") {
      try {
        setConversation(prev => [...prev, prompt, "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."]);
        setPrompt(""); // Clear the input
        setButtonToggle(!buttonToggle);
      } catch (error) {
        console.error('Error updating conversation:', error);
      }
    } else {
      console.warn('Prompt cannot be empty.');
    }
  };

  const handleInsert = () => {
    if (conversation.length > 0) {
      const lastPrompt = conversation[conversation.length - 1];
      const targetElement = document.querySelector('.msg-form__contenteditable p') as HTMLElement;

      if (targetElement) {
        try {
          targetElement.focus();
          targetElement.innerHTML = lastPrompt;

          // Trigger 'input' event for LinkedIn to recognize the update
          const event = new Event('input', { bubbles: true });
          targetElement.dispatchEvent(event);

          togglePopup(false); // Close the popup
        } catch (error) {
          console.error('Error inserting text into target element:', error);
        }
      } else {
        console.error('Target element not found for inserting text.');
      }
    } else {
      console.warn('No conversation available to insert.');
    }
  };

  const updatePosition = () => {
    const targetElement = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    if (targetElement) {
      try {
        const rect = targetElement.getBoundingClientRect();
        setPosition({
          top: conversation.length > 0 ? rect.top + window.scrollY - 250 : rect.top + window.scrollY - 100,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
        setPositionCalculated(true);
      } catch (error) {
        console.error('Error calculating position:', error);
      }
    } else {
      console.error('Target element not found for position update.');
    }
  };

  useEffect(() => {
    try {
      updatePosition(); // Initial calculation when component mounts

      const handleResize = () => updatePosition(); // Update position on window resize
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error during useEffect execution:', error);
    }
  }, [conversation]);

  // Render the popup only if position is calculated
  if (!positionCalculated || !position) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute z-[100000] bg-white border border-[#adadad] rounded-lg shadow-xl p-1 min-h-28 transition-all duration-100 ease-in-out"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      <div className="p-2 flex flex-col">
        {conversation.map((data, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} my-1`}
          >
            <div className={`border border-gray-300 rounded-md p-2 max-w-[75%] ${index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-100'}`}>
              {data}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2">
        <input
          type="text"
          className="input-style w-full border border-gray-300 rounded-md p-1"
          placeholder="Your prompt"
          value={prompt}
          onChange={handleChange}
        />
      </div>
      <div className="p-2 flex justify-end">
        {buttonToggle ? (
          <img className="h-10 cursor-pointer" onClick={handleClick} src={GenerateBtn} alt="Generate Button" />
        ) : (
          <>
            <img className="h-10 cursor-pointer" onClick={handleInsert} src={Insert} alt="Insert" />
            <img className="h-10 cursor-pointer ml-3" src={ReGenerateBtn} alt="Regenerate" />
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
