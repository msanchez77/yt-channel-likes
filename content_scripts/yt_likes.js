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
  // Logging from the background script will only show in the extension console
  console.log("Message from the background script:");
  console.log(request.greeting); // "Hi from background script"
  return Promise.resolve({ response: "Hi from content script" });
});