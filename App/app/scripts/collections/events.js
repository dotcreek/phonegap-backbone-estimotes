(function() {
    'use strict';

    App.Collections.Events = Backbone.Collection.extend({

        model: App.Models.Event,

        url: App.config.api + 'events',

        comparator: function(m) {
            return moment(m.get('startAt')).unix();
        }

    });

})();
