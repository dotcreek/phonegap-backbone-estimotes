(function() {
    'use strict';

    App.Models.Content = Backbone.Model.extend({

        urlRoot: App.config.api + 'contents',

        defaults: {},

        isFavorite: function() {
            var model = App.Favorites.findWhere({
                favoriteId: this.get('id')
            });

            if (model) {
                return 'icon-star-filled';
            }
            return 'icon-star';
        }
    });
})();
