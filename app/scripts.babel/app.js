(() => {
    'use strict';
    window.DashApp = (() => {
        var app = {};
        const defaults = {
            webHost: 'https://swpp-server-stage.herokuapp.com/',
            refreshInterval: 60,
            dbcfg: {name: 'DashExtensionStorage', ver: 1},
            maxMemory: 2 * 1024 * 1024 //  2 MB
        };
        app.defaults = defaults;

        return app;
    })();

    var DashDB;
    window.DashApp.init = function (userid, db) {
        window.DashApp.userid = userid;
        DashDB = db;
    };

})();
