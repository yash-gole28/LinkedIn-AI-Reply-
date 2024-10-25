export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  // Listen for messages from content scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getTabId') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id; // Get the active tab ID
        sendResponse({ tabId }); // Send the tab ID back to the content script
      });
      return true; // Keep the message channel open for the async response
    }
  });

});
