((DashApp) => {
    if (!DashApp)
        window.DashApp = {};
    'use strict';
    window.DashApp.Views = (() => {
        var module = {};
        const create_task_btn =
            `<div class="input-group new-task">
             <span class="input-group-btn">
             <input type="text" class="form-control" placeholder=  
             "describe a new task...">
             <button class="btn btn-default" type="button">  
             create</button></span> 
             </div>`;

        const task = 
            `<div class="form-check task">
             <label class="form-check-label">
             <input class="form-check-input" type="checkbox" value="">
             %description
             </label>
             </div>`;

        return {
            CreateTaskButton: () => create_task_btn,
            Task: d => {
                if (d.length > 60) 
                    d = d.substr(0,57) + '...';
                return task.replace('%description', d);
            }
        };
    })();
})(window.DashApp || null);
