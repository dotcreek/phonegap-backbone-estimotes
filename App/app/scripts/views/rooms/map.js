(function() {
    'use strict';

    App.Views.RoomsMap = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/map.ejs'],

        render: function(options) {
            this.$el.html(this.template({
                img: options.img,
                name: options.name
            }));
            return this;
        },

        events: {
            'click .btn-back': 'back'
        },

        back: function() {
            window.history.back();
            return false;
        }
    });
})();
