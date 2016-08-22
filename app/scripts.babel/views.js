(() => {
    'use strict';
    window.DashApp.Views = (() => {
        var module = {};
        return module;
    })();
    window.DashApp.Views.CreateWorkspaceButton = function () {
        return ['<div class="btn-group" role="group" aria-label="...">',
                '<button type="button" class="btn btn-default">',
                'Create Workspace',
                '</button></div>'].join('');
    }
})();
