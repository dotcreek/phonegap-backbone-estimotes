(function () {
    'use strict';

    App.Views.Rooms = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/index.ejs'],

        render: function() {
            this.$el.html(this.template({collection : this.collection}));
            return this;
        }
    });
})();
