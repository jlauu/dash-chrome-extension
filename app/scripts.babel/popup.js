'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({
        _MSG_TYPE: 'popup',
        _HAS_CALLBACK: true,
    }, ({url: url, view: view}) => {
        if (url) {
            $('.container').load(url);
        } else if (view) {
            $('.container').append(view);
        }
    });
});
