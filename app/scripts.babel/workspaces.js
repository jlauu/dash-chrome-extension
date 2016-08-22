(() => {
    'use strict';
    var local_store;            
    window.DashApp.Workspaces = (() => {
        const table_cfg = {
            name: 'workspace',
            columns: ['userid','title','data'],
            driver: localforage.INDEXEDDB,
        };
        local_store = localforage.createInstance(table_cfg);
        return {};
    })();

    window.DashApp.Workspaces.get = function (title) {
        if (!title) 
            return Promise.reject();
        else
            return local_store.getItem(title);
    };

    window.DashApp.Workspaces.new = function (title) {
        return local_store.getItem(title).then(val => {
            if (val) {
                console.log('Workspace ' + title + ' already exists!');
                return Promise.reject('Exists');
            } else {
                return local_store.setItem(title, {'title': title,'data': {}});
            }
        });
    };

    window.DashApp.Workspaces.update = function (w) {
        return local_store.setItem(w.title, w);
    };

    window.DashApp.Workspaces.getAll = function () {
        var ws = [];
        return local_store.keys().then(keys => {
            return Promise.all(keys.map( k => {
                window.DashApp.get(k);
            }));
        });
    };

    window.DashApp.Workspaces.getView = function (title) {
       return window.DashApp.Workspaces.get(title).then(w => {
           return '<div>' + w.title + '</div>';
       });
    };
})();
