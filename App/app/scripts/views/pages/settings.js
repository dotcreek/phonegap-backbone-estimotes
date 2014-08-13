(function() {
    'use strict';

    App.Views.Settings = Backbone.View.extend({

        template: JST['app/scripts/templates/pages/settings.ejs'],

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
})();
