export default defineContentScript({
  matches: ['*://www.google.com/*'],
  main() {
    // Access the Google search input field by its name attribute ('q')
    const searchField = document.querySelector('input[name="q"]') as HTMLInputElement;

    if (searchField) {
      // Insert text into the search field
      searchField.value = "AI-powered search suggestion";

      // Trigger an 'input' event to simulate typing so Google reacts to the new value
      const event = new Event('input', { bubbles: true });
      searchField.dispatchEvent(event);
    }
  }
});
