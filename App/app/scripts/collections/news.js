(function() {
    'use strict';

    App.Collections.News = Backbone.Collection.extend({

        model: App.Models.News,

        url: App.config.api + 'news',

        parse: function(data) {
            if (!_.isEmpty(data)) {
                data[0].isFirst = true;
            }
            return data;
        }

    });

})();
