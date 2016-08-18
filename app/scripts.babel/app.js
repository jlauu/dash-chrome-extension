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
        return app;
    })();

    window.DashApp.init = function (userid, db) {
        window.DashApp.userid = userid;
        window.DashApp._db = db;
    };

    window.DashApp.upload = function (callback) {
        var wstore = window.DashApp._db.transaction('workspace').objectStore('workspace');
        // Get workspaces from local
        var fetchWS = new Promise ((resolve, reject) => {
            var workspaces = [];
            var c = wstore.openCursor()
            c.onerror = event => reject(event);
            c.onsuccess = event => {
                var cursor = event.target.result;
                if (cursor) {
                    workspaces.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(workspaces);
                }
            };
        // Upload workspaces to external server
        }).then(ws => {
            var xhr = new XMLHttpRequest();
            var json = JSON.stringify(ws);
            var {webHost: host, endpoints : { send: s, workspace: path }} = window.DashApp.defaults;
            var url = encodeURI(host + send + '/' + path + '?userid=' + window.DashApp.userid);
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 20)
                    console.log(xhr.responseText);
                if (callback)
                    callback();
            };
            xhr.send(json);
        });
    }

    window.DashApp.refresh = function (callback) {
        var {webHost: host, endpoints : { workspaces: path }} = window.DashApp.defaults;
        var url = encodeURI(host + path + '?userid=' + window.DashApp.userid);
        // TODO - Headers/Request Object
        fetch(url).then(response => {
            return response.json();
        }).then(workspaces => {
            var transaction = window.DashApp._db.transaction(['workspace'], 'readwrite');
            var wstore = transaction.objectStore('workspace');
            transaction.oncomplete = event => {if (callback) callback()};
            transaction.onerror = event => {
                 alert('Failed to refresh workspaces: ' + event.target.errorCode);
            };
            for (const w of workspaces) {
                var request = wstore.put(w);
                request.onerror = event => {
                    alert('Failed to add workspace to DB: ' + event.target.errorCode);
                };
                request.onsuccess = event => console.log('Put: ' + w);
            }
        });
    };
})();
