import {constants} from "."  // fix this when refactoring


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      redirectUrl: constants.ourWebpage
    };
  },
  {
    urls: constants.blockedUrls, // gonna need to fix to deal with DB querying for the list of blockedUrls
    types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other']
  },
  ['blocking']
);
