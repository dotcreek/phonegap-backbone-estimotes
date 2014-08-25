(function() {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: App.config.api + 'rooms',

        defaults: {},

        parse: function(data) {
            debugger;
            this.currentEvent = data.currentEvent;
            this.upcoming = data.upcoming;
            return data.room;
        }
    });
})();
