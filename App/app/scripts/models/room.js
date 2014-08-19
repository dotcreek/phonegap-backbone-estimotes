(function() {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: 'http://localhost:4000/rooms',

        defaults: {}
    });
})();
