(function() {
    'use strict';

    App.Models.Favorite = Backbone.Model.extend({
        urlRoot: App.config.api + 'favorites',
        defaults: {
            favoriteId: ''
        }
    });
})();
