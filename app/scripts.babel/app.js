(() => {
    'use strict';
    // Private
    function loadTemplate(file) {
        return chrome.extension.getURL('templates/'+file);
    }

    window.DashApp = (() => {
        var app = {};
        const defaults = {
            webHost: 'https://swpp-server-stage.herokuapp.com/',
            endpoints: {
                workspaces: 'workspace',
                send: 'send'
            },
            refreshInterval: 60,
            dbcfg: {name: 'DashExtensionStorage', ver: 2},
            maxMemory: 2 * 1024 * 1024 //  2 MB
        };
        app.defaults = defaults;
        app.MSG_POPUP = 'setPopup';
        app.MSG_WORKSPACE_VIEW = 'workspaceView';
        app.MSG_WORKSPACE_NEW = 'workspaceNew';
        app.MSG_WORKSPACE_SETCURRENT = 'workspaceSetCurrent';
        app.MSG_WORKSPACE_UPDATE = 'workspaceUpdate';
        app.messages = new Map([
            [app.MSG_POPUP, setPopup],
            [app.MSG_WORKSPACE_VIEW, workspaceView],
            [app.MSG_WORKSPACE_NEW, workspaceNew],
            [app.MSG_WORKSPACE_SETCURRENT, workspaceSetCurrent],
            [app.MSG_WORKSPACE_UPDATE, workspaceUpdate],
        ]);
        return app;
    })();

    // Creates a valid sendMessage
    window.DashApp.newMessage = function (message, request, callback) {
        if (window.DashApp.messages.has(message)) {
            request._MSG_TYPE = message;
            request._HAS_CALLBACK = typeof callback === 'function';
            chrome.runtime.sendMessage(request, callback);
        } else {
            throw 'Attempting to create invalid message: ' + message;
        }
    }

    window.DashApp.setCurrentWorkspace = function (title) {
        window.DashApp.Workspaces.get(title).then(w => {
            window.DashApp.current = w.title;
        }).catch( err => {
            window.DashApp.current = null;
        });
    };

    // Messages
    function setPopup({}, send) {
        var w = window.DashApp.current;
        if (w) {
            window.DashApp.Workspaces.getView(w.title).then(view => {
                send({
                    state: 'workspace',
                    workspace: w,
                    view: '<div>Create Task...</div>'
                });
            }).catch(() => {
                send({state: 'default'});
                window.DashApp.current = null;
            });
        } else {
            send({state: 'default'});
        }
    }

    function workspaceView({title: t}, send) {
        window.DashApp.Workspaces.getView(t).then(view => {
            send({view: view});
        }).catch( err => {
            send({view: null});
        });
    }

    function workspaceNew({title: t}, send) {
        t = t || 'Untitled';
        window.DashApp.Workspaces.new(t).then(w => {
            window.DashApp.current = t;
            send(w);
        }).catch(err => {
            if (err == 'Exists') {
                workspaceNew({title: uniquify(t), }, send);
            }
        });
    }

    function workspaceSetCurrent({title: t}, send) {
        if (t) {
            window.DashApp.Workspaces.get(t).then(w => {
                window.DashApp.current = w;
                send(w);
            });
        }
    }

    function workspaceUpdate({workspace: w}, send) {
        if (w) {
            send(window.DashApp.Workspaces.update(w));
        }
    }
})();
