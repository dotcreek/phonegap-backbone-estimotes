(function () {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: App.config.api + 'rooms',

        defaults: {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
