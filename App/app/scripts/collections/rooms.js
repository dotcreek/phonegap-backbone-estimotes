(function () {
    'use strict';

    App.Collections.Room = Backbone.Collection.extend({

        model: App.Models.Room,

        url: 'http://localhost:4000/rooms'

    });

})();
