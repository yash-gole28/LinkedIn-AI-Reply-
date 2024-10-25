import { useState } from 'react';
import './style.css';
import NewIcon from '@/components/NewIcon';
import image from '@/assets/Frame.svg'

function App() {
  const changeColor = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true });
      if (tab?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            // console.log(chrome.runtime.getURL(image))
            const getElements = document.body.getElementsByClassName('fM33ce');
            const newElementClass = 'my-extension-element';
            // Check if an element with the specified class already exists
            const existingElement = document.body.getElementsByClassName(newElementClass);

            if (existingElement.length === 0) {
              const newElement = document.createElement('img');
              newElement.src = chrome.runtime.getURL(image)
              newElement.className = newElementClass; // Add the class to the new element
              newElement.style.color = 'blue'; // Example styling
              newElement.style.fontSize = '20px'; // Example styling
              getElements[0]?.appendChild(newElement);
            } else {
              console.warn('Element with class "my-extension-element" already exists.');
            }
          },
        });
      } else {
        console.error('No active tab found');
      }
    } catch (error) {
      console.error('Error executing script:', error);
    }
  };

  return (
    <>
      <div>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={changeColor}>
          <NewIcon/>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-blue-900 font-bold">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
