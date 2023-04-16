var blockedSites = ["facebook.com", "twitter.com", "instagram.com"];

// Get the current URL
var currentUrl = window.location.href;

// Check if the current URL matches the list of blocked websites
for (var i = 0; i < blockedSites.length; i++) {
  if (currentUrl.indexOf(blockedSites[i]) !== -1) {
    // Redirect to a custom message page
    window.location.replace("http://google.com");
  }
}