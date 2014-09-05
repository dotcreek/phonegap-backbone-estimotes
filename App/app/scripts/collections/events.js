(function() {
    'use strict';

    App.Collections.Events = Backbone.Collection.extend({

        model: App.Models.Event,

        url: App.config.api + 'events'

    });

})();
