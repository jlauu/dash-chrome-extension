(() => {
    'use strict';
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Message: ', request);
        window.DashApp.messages.get(request._MSG_TYPE)(request, sendResponse);
        return request._HAS_CALLBACK;
    });
})();
