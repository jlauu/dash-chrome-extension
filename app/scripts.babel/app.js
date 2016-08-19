(() => {
    'use strict';
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
        app.messages = new Map([
            ['popup', setPopup]
        ]);
        return app;
    })();

    window.DashApp.setCurrentWorkspace = function (title) {
        window.DashApp.Workspaces.get(title).then(w => {
            window.DashApp.current = w.title;
        }).catch( err => {
            window.DashApp.current = null;
        });
    };

    // Messages
    function setPopup(request, send) {
        window.DashApp.Workspaces.getView(window.DashApp.current).then(view => {
            send({view: view});
        }).catch( err => {
            send({view: '<h1>Create Workspace</h1>'});
        });
    }
})();
