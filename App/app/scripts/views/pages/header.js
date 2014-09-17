(function() {
    'use strict';

    // Extends main.js
    App.Views.Header = Backbone.View.extend({
        el: '.bar-tab',
        template: JST['app/scripts/templates/partials/menu.ejs'],


        render: function() {
            this.$el.html(this.template());

            return this;
        },

        setActive: function(selector) {
            if (this.$el.is(':hidden')) {
                this.$el.show();
            }
            this.$el.find('a').removeClass('active');
            this.$el.find(selector).addClass('active');
        },

        hide: function() {
            if (PHONEGAP && device.platform === 'Android') {
                this.$el.hide();
            }
        }
    });
})();
