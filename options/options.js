/**
Display the redirect URL.
*/
document.querySelector("#redirect-url").textContent = browser.identity.getRedirectURL();

document.querySelector("#redirect-url").addEventListener("click", () => {
  console.log(browser.identity.getRedirectURL());
});