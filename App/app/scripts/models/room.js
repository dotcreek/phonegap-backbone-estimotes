(function() {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: App.config.api + 'rooms',

        defaults: {},

        parse: function(data) {
            this.currentEvent = data.currentEvent;
            if (_.isEmpty(data.currentEvent)) {
                this.currentEvent = false;
            }
            this.upcomming = data.upcomming || [];
            return data;
        }
    });
})();
