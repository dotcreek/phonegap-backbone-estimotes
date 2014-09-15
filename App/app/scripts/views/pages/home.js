(function() {
    'use strict';

    // Extends main.js
    App.Views.Home = App.Views.Main.extend({

        template: JST['app/scripts/templates/pages/home.ejs'],


        addOne: function(model) {
            var template  = App.utils.getTemplate('events/event'),
                eventView = new App.Views.CellView({model: model, template: template});
            this.listSelector.append(eventView.render());
        }
    });
})();
