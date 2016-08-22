(() => {
    'use strict';
    window.DashApp.Views = (() => {
        var module = {};
        return module;
    })();
    window.DashApp.Views.CreateTaskButton = function () {
        return [
            '<div class="input-group new-task">',
            '<span class="input-group-btn">',
            '<input type="text" class="form-control" placeholder=',
            '"Describe a new task...">',
            '<button class="btn btn-default" type="button">',
            'Create</button></span>',
            '</div>'
        ].join('');
    }
})();
