import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import GenerateBtn from '@/assets/Generate-btn.png';
import ReGenerateBtn from '@/assets/regenerate.png';
import Insert from '@/assets/Insert.png';

interface PopupProps {
  togglePopup: (isOpen: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ togglePopup }) => {
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 150,
  });
  const [prompt, setPrompt] = useState<string>("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [buttonToggle, setButtonToggle] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleClick = () => {
    if (prompt.trim() !== "") {
      setConversation([...conversation,prompt,"Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."]);
      setPrompt(""); // Clear the input
      setButtonToggle(!buttonToggle);
      console.log(conversation)
    }
  };

  const handleInsert = () => {
    if (conversation.length > 0) {
      const lastPrompt = conversation[conversation.length - 1];
      const targetElement = document.querySelector('.msg-form__contenteditable p') as HTMLElement;
  
      if (targetElement) {
        targetElement.focus(); // Focus on the contenteditable element
  
        targetElement.innerHTML = "";

        targetElement.innerHTML = lastPrompt;
  
        // Trigger an 'input' event to simulate typing so LinkedIn reacts to the new value
        const event = new Event('input', { bubbles: true });
        targetElement.dispatchEvent(event);
  
        togglePopup(false); // Close the popup
      }
    }
  };
  

  useEffect(() => {
    const targetElement = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: conversation?.length > 0 ? rect.top + window.scrollY - 200 : rect.top + window.scrollY - 100, 
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [conversation]);

  return ReactDOM.createPortal(
    <div
      className="absolute z-[100000] bg-white border border-[#adadad] rounded-lg shadow-xl p-1 min-h-28"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      <div className="p-2 flex flex-col">
        {conversation.length > 0 && conversation.map((data, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} my-1`}
          >
            <div
              className={`border border-gray-300 rounded-md p-2 max-w-[75%] ${index % 2 === 0 ? ' bg-custom-gray' : ' bg-custom-blue'}`}
            >
              {data}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2">
        <input
          type="text"
          className="w-full input-style border border-gray-300 rounded-md p-1"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={handleChange}
        />
      </div>
      <div className="p-2 flex justify-end">
        {buttonToggle ? (
          <img className="h-10 cursor-pointer" onClick={handleClick} src={GenerateBtn} alt="Generate Button" />
        ) : (
          <>
            <img className="h-10 cursor-pointer" onClick={handleInsert} src={Insert} alt="" />
            <img className="h-10 cursor-pointer ml-3" src={ReGenerateBtn} alt="" />
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
