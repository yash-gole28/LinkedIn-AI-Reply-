import React from 'react';
import { createRoot } from 'react-dom/client';
import NewIcon from '@/components/NewIcon';
import '@/entrypoints/popup/style.css'

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*/*'],
  main() {
    
    const targetClass = 'msg-form__contenteditable';

    // Use MutationObserver to wait for the element to load
    const observer = new MutationObserver((mutations, obs) => {
      const targetElement = document.getElementsByClassName(targetClass)[0];
      if (targetElement) {
        // Stop observing once the element is found
        obs.disconnect();

        // Create and style the container for NewIcon
        const container = document.createElement('div');
        container.id = 'hello-world-container';
        container.style.position = 'absolute';
        container.style.bottom = '0px';
        container.style.right = '0px';
        container.style.zIndex = '99999';

        // Append the container to the target element
        targetElement.appendChild(container);

        // Render the NewIcon React component
        const root = createRoot(container);
        root.render(React.createElement(NewIcon));
      }
    });

    // Start observing the body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
