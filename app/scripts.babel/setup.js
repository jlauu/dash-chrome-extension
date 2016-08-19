(() => {
   'use strict';
    function setup() {
        var fetchID = new Promise ((resolve, reject) => {
            chrome.identity.getProfileUserInfo(info => {
                if (info.id) 
                    resolve(info.id);
                else
                    reject();
            });
        }).then(id => {       
            window.DashApp.userid = id;
        });
    }
    setup();
})();
