(function() {
    'use strict';

    App.Views.Favorites = Backbone.View.extend({

        template: JST['app/scripts/templates/favorites/index.ejs'],

        render: function() {
            this.$el.html(this.template({
                collection: this.collection
            }));
            return this;
        }
    });
})();
