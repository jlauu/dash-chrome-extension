'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.runtime.sendMessage({
            'type': 'popup',
            'tab': tabs[0].url
        }, ({view: view}) => {
            console.log(view);
            $('body').append(view);   
        });
    });
});
