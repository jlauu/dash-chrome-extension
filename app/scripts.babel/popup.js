'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({
        _MSG_TYPE: 'popup',
        _HAS_CALLBACK: true,
    }, ({url: url, view: view}) => {
        if (url) {
            $('html').load(url);
        } else if (view) {
            $('.popup-container').append(view);
        }
    });
});
