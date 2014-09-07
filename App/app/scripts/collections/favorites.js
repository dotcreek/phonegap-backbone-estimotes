(function() {
    'use strict';

    App.Collections.Favorites = Backbone.Collection.extend({
        url: App.config.api + 'favorites',
        localStorage: new Backbone.LocalStorage('Favorites'),
        model: App.Models.Favorite
    });
})();
