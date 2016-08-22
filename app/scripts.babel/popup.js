'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({
        _MSG_TYPE: 'popup',
        _HAS_CALLBACK: true,
    }, ({url: url, view: view, selector: selector}) => {
        if (url) {
            $(selector || '#popup-container').load(url);
        } else if (view) {
            $(selector || '#popup-container').append($(view));
        }
    });
});
