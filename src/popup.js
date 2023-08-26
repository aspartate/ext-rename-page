document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.getElementById('submitBtn');

  submitBtn.addEventListener('click', function() {
    const newTitle = document.getElementById('newTitle').value;

    if (newTitle) {
      // Get the current tab id as an integer
      const queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function(tabs) {
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
  });
});

function renamePage(newTitle) {
  document.title = newTitle;
}
