(function() {
    'use strict';

    App.Models.News= Backbone.Model.extend({

        urlRoot: App.config.api + 'news',
        defaults: {}
    });
})();
