import {constants} from "../constants/constants"  // fix this when refactoring
const blockList = require('./blockList.json')


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {
      redirectUrl: constants.ourWebpage
    };
  },
  {
    urls: blockList.blocked,
    types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'object', 'xmlhttprequest', 'other'] // might only need main_frame
  },
  ['blocking']
);