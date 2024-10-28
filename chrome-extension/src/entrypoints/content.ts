import React from 'react';
import { createRoot } from 'react-dom/client';
import IconWithPopup from '@/components/IconWithPopup';
import '@/entrypoints/popup/style.css';

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*/*'],
  main() {
    const messageFormClass = 'msg-form__contenteditable';
    let currentUrl = window.location.href;
    let iconContainer: HTMLDivElement | null = null; // Declare iconContainer outside
    let isListenerAdded = false; // Flag to track if listeners are added

    /**
     * Creates and returns an icon container div 
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

      // Create the icon container only once
      if (!iconContainer) {
        iconContainer = createIconContainer();
        if (iconContainer) {
          targetElement.appendChild(iconContainer);
          try {
            const root = createRoot(iconContainer);
            root.render(React.createElement(IconWithPopup));
          } catch (error) {
            console.error('Error rendering React component:', error);
          }
        }
      }

      // Add focus and blur event listeners only once
      if (!isListenerAdded) {
        iconContainer!.style.display = 'none'; // Initially hide the icon

        targetElement.addEventListener('focus', () => {
          iconContainer!.style.display = 'block'; // Show the icon
        });

        targetElement.addEventListener('blur', () => {
          iconContainer!.style.display = 'none'; // Hide the icon
        });

        isListenerAdded = true; // Set flag to true to prevent adding listeners again
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
