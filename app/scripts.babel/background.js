(() => {
    'use strict';
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (window.DashApp.messages.has(request.type)) {
            console.log('Message: ', request);
            window.DashApp.messages.get(request.type)(request, sendResponse);
            return true;
        }
    });
})();
