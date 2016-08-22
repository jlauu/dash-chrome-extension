'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({
        _MSG_TYPE: 'setPopup',
        _HAS_CALLBACK: true,
    }, r => {
        switch (r.state) {
            case 'workspace':
                workspaceView(r);
                break;
            default:
                defaultView();
        }
    });
});

function defaultView() {
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
                _MSG_TYPE: 'workspaceSetCurrent',
                _HAS_CALLBACK: true,
                title: w.title
            }, () => {
                window.location = window.location;   
            });
        });
    });
}

function workspaceView({workspace: w, view: v}) {
    $('nav').html('<p class="navbar-brand">Current Workspace: '+w.title+'</p>');
    $('#popup-container').html(v);
}
