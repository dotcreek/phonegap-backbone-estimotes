(function() {
    'use strict';

    App.Models.Session = Backbone.Model.extend({
        urlRoot: App.config.api + 'sessions',
        defaults: {},
    });
})();
