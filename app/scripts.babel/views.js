(() => {
    'use strict';
    window.DashApp.Views = (() => {
        var module = {};
        const classes = {
            POPUP_CONTAINER: 'popup-container',
            BUTTON_CREATE_WORKSPACE: 'DashCreateWorkspaceButton'
        };
        module.classes = classes;
        return module;
    })();
    var classes = window.DashApp.Views.classes;
    window.DashApp.Views.CreateWorkspaceButton = function () {
        return '<div class='+classes.BUTTON_CREATE_WORKSPACE+'>Create Workspace</div>';
    }
})();
