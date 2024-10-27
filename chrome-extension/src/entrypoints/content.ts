import React from 'react';
import { createRoot } from 'react-dom/client';
import IconWithPopup from '@/components/IconWithPopup';
import '@/entrypoints/popup/style.css';

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*/*'],
  main() {
    const messageFormClass = 'msg-form__contenteditable';
    let currentUrl = window.location.href;

    /**
     * Creates and returns an icon container div with Tailwind styling
     */
    const createIconContainer = (): HTMLDivElement | null => {
      try {
        const container = document.createElement('div');
        container.id = 'icon-container';
        container.className = 'absolute bottom-0 right-0 z-[99999]';
        return container;
      } catch (error) {
        console.error('Error creating icon container:', error);
        return null; // Return null if there's an error
      }
    };

    /**
     * Injects the icon container into the target message form
     */
    const injectIcon = () => {
      const targetElement = document.getElementsByClassName(messageFormClass)[0];

      if (!targetElement) {
        console.error(`Element with class ${messageFormClass} not found.`);
        return; // Exit the function if the target element doesn't exist
      }

      const existingContainer = document.getElementById('icon-container');
      
      if (!existingContainer) {
        const container = createIconContainer();
        if (container) {
          targetElement.appendChild(container);

          try {
            const root = createRoot(container);
            root.render(React.createElement(IconWithPopup));
          } catch (error) {
            console.error('Error rendering React component:', error);
          }
        }
      }
    };

    // Observe DOM changes to inject icon dynamically
    const observer = new MutationObserver((mutationsList, observer) => {
      try {
        injectIcon();
      } catch (error) {
        console.error('Error during DOM observation:', error);
      }
    });

    // Start observing the document body for changes
    try {
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (error) {
      console.error('Error starting MutationObserver:', error);
    }

    // Monitor URL changes to re-run icon injection
    setInterval(() => {
      try {
        if (currentUrl !== window.location.href) {
          currentUrl = window.location.href;
          injectIcon();
        }
      } catch (error) {
        console.error('Error during URL monitoring:', error);
      }
    }, 1000);
  },
});
