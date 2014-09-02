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
            this.upcoming = data.upcoming || [];
            this.upcomingFirst = data.upcoming ? data.upcoming[0] : false;
            if (this.upcomingFirst) {delete data.upcoming[0];}

            return data;
        }
    });
})();
