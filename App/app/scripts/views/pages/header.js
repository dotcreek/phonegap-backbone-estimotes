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

        /**
         * @name Header#hide
         * @memberOf Header
         * @method hide
         * @description Hide header on Android devices
         */
        hide: function() {
            if (App.utils.isAndroid()) {
                this.$el.hide();
            }
        }
    });
})();
