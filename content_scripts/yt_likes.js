function waitForElementToDisplay(selector) {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}

// Usage:
waitForElementToDisplay('#channel-header #meta').then((element) => {
  // Do something with the element once it's available
  
  const p = document.createElement("p");
  p.textContent = "Hola";
  
  element.appendChild(p);

});

browser.runtime.onMessage.addListener((request) => {
  // Logging from the content script will only show in the browser console
  console.log(request.greeting); // Confirmation that the user has been authorized
  
  // Get the channel ID from the page and send to the background script
  let metaTag = document.querySelector('meta[itemprop="channelId"]');
  let channelId = metaTag.content;  
  console.log(channelId);

  return Promise.resolve({ response: channelId });
});

// browser.runtime.sendMessage