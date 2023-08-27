document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('submitBtn');
  const newTitleInput = document.getElementById('newTitle');

  // Function to get current tab's title and populate the input field
  function populateCurrentTitle() {
    const queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, function (tabs) {
      const tab = tabs[0];
      newTitleInput.value = tab.title;
      newTitleInput.select();  // Highlights the text in the input field
    });
  }

  // Function to handle renaming
  function handleRename() {
    const newTitle = newTitleInput.value;
    if (newTitle) {
      // Get the current tab id as an integer
      const queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (tabs) {
        const tab = tabs[0];
        const tabId = tab.id;

        // Execute script to rename the page
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: renamePage,
          args: [newTitle]
        });

        // Close the popup
        window.close();
      });
    }
  }

  // Populate the input field with the current tab's title
  populateCurrentTitle();

  // Add click event listener to submit button
  submitBtn.addEventListener('click', handleRename);

  // Add keydown event listener to newTitle input
  newTitleInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleRename();
    }
  });
});

function renamePage(newTitle) {
  document.title = newTitle;
}
