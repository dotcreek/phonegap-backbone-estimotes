(function() {
    'use strict';

    App.Models.Event = Backbone.Model.extend({

        urlRoot: App.config.api + 'events',
        defaults: {}
    });
})();
