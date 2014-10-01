(function() {
    'use strict';

    App.Views.NewsShow = Backbone.View.extend({

        template: JST['app/scripts/templates/news/show.ejs'],

        render: function() {
            this.$el.html(this.template({
                model: this.model
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
