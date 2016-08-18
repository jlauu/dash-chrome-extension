(() => {
   'use strict';
    function buildDB(db, done) {
        var workspaces = db.createObjectStore('workspace', { autoIncrement: true});
        workspaces.createIndex('title', 'name', {unique: false});
        workspaces.createIndex('annotations', 'annotations', {unique: false});
        workspaces.createIndex('graph', 'graph', {unique: false});
        workspaces.transaction.oncomplete = function (event) {
            done();
        };
    }

    function setup() {
        var fetchDB = new Promise ((resolve, reject) => {
            var {name, ver} = window.DashApp.defaults.dbcfg;
            var request = window.indexedDB.open(name, ver);
            request.onerror = function (event) {
                alert('DashDB failed to open: ' + event.target.errorCode);
                reject();
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onupgradeneeded = function (event) {
                db = event.target.result;
                buildDB(db, () => resolve(db));
            };
        });

        var fetchID = new Promise ((resolve, reject) => {
            chrome.identity.getProfileUserInfo(info => {
                if (info.id) 
                    resolve(info.id);
                else
                    reject();
            });
        });
        
        Promise.all([fetchID, fetchDB]).then(([id, db]) => {
            window.DashApp.init(id,db);
        });
    }
    setup();
})();
