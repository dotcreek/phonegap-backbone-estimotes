(function () {
    'use strict';

    App.Collections.Room = Backbone.Collection.extend({

        model: App.Models.Room,

        url: App.config.api + 'rooms'

    });

})();
