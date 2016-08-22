'use strict';
document.addEventListener('DOMContentLoaded', () => {
    $('#new-wkspc-btn').click(() => {
        var v = $('#new-wkspc-input').prop('value');
        var fetchNewWkspc = new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                _MSG_TYPE: 'workspaceNew',
                _HAS_CALLBACK: true,
                title: v
            }, w => {
                resolve(w);
            });
        }).then(w => {
            chrome.runtime.sendMessage({
                _MSG_TYPE: 'workspaceView',
                _HAS_CALLBACK: true,
                title: w.title
            }, ({view: v}) => {
                if (v) {
                    $('#popup-container').append($(v));
                }
            });
        });
    });
});
