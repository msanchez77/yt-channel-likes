import { getAccessToken } from "./authorize.js";
import { getUserInfo } from "./userInfo.js";  

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { greeting: "Hi from background script" })
      .then((response) => {
        // Logging from the content script will only show in the browser console
        // Logging from the background script will only show in the extension console

        console.log("Message from the content script:");
        console.log(response.response); // "Hi from content script"
      })
      .catch(onError);
  }
}

function notifyBrowser(userPlaylists) {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs)
    .catch(onError);

  console.table(userPlaylists.items);
}

function logError(error) {
  console.error(`Error: ${error}`);
}

/**
When the button's clicked:
- get an access token using the identity API
- use it to get the user's info
- show a notification containing some of it
*/
document.querySelector("button").addEventListener("click", () => {
  getAccessToken()
    .then(getUserInfo)
    .then(notifyBrowser)
    .catch(logError);
});

// Agenda 4/11
// -- 1. Get the user's liked videos (start with first 50 results)
// -- 2. Send that data to the content script
// -- 3. Add a simple message of the latest liked video to the page
