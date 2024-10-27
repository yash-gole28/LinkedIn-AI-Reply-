import React from 'react';
import { createRoot } from 'react-dom/client';
import NewIcon from '@/components/NewIcon';
import '@/entrypoints/popup/style.css'

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*/*'],
  main() {
    const targetClass = 'msg-form__contenteditable';
    let currentUrl = window.location.href;

    const injectIcon = () => {
      // Check if the target element exists and the icon isn't already appended
      const targetElement = document.getElementsByClassName(targetClass)[0];
      const existingContainer = document.getElementById('icon-container');
      if (targetElement && !existingContainer) {
        const container = document.createElement('div');
        container.id = 'icon-container';
        container.style.position = 'absolute';
        container.style.bottom = '0px';
        container.style.right = '0px';
        container.style.zIndex = '99999';

        targetElement.appendChild(container);
        const root = createRoot(container);
        root.render(React.createElement(NewIcon));
      }
    };

    // Observe DOM changes to detect when the target element becomes available
    const observer = new MutationObserver((mutations, obs) => {
      injectIcon(); // Try to inject the icon if the target class is found
    });

    // Start observing the body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Monitor URL changes to re-run the icon injection
    setInterval(() => {
      if (currentUrl !== window.location.href) {
        currentUrl = window.location.href;
        injectIcon(); // Try to inject the icon on URL change
      }
    }, 1000); // Check for URL changes every 1 second
  },
});
