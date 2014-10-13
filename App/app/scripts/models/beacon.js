(function() {
    'use strict';

    App.Models.Beacon = Backbone.Model.extend({

        urlRoot: App.config.api + 'beacons',

        defaults: {}
    });

})();
