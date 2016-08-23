'use strict';
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({
        _MSG_TYPE: 'setPopup',
        _HAS_CALLBACK: true,
    }, r => {
        console.log('setPopup: ', r);
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
    window._workspace = w;
    $('nav')
        .html([
            '<p class="navbar-brand">',
            'Current Workspace: ',
            w.title,
            '</p>'].join(''))
        .css('height', 40)
        .css('padding-top', 0);
    $('#popup-container')
        .html(v)
        .css('padding-top', 55)
    $('#task-list')
        .append($(w.tasks.map(window.DashApp.Views.Task)));
    $('.task:gt(0)').before('<hr>');
    var new_task = $('.new-task button');
    new_task.click(() => {
        var v = $('.new-task input').prop('value');
        if (v.length > 0) {
            if (!w.tasks) w.tasks = [];
            if (w.tasks.length > 0)
                $('#task-list').append('<hr>');
            w.tasks.push(v);
            var task = window.DashApp.Views.Task(v);
            $('#task-list').append(task);
            update(w);
        }
    });
}

function update(w) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            _MSG_TYPE: 'workspaceUpdate',
            _HAS_CALLBACK: true,
            workspace: w
        }, w => {
            resolve(w);     
        });
    });
}
