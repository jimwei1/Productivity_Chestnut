import {constants} from "."  // fix this when refactoring


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      redirectUrl: constants.ourWebpage
    };
  },
  {
    urls: constants.blockedUrls,
    types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
  },
  ['blocking']
);
