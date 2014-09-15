(function() {
    'use strict';

    App.Views.Rooms = App.Views.Main.extend({

        template: JST['app/scripts/templates/rooms/index.ejs'],

        addOne: function(model) {
            var template  = App.utils.getTemplate('rooms/room'),
                roomView  = new App.Views.CellView({model: model, template: template});
            this.listSelector.append(roomView.render());
        }
    });
})();
