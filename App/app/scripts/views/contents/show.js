(function() {
    'use strict';

    App.Views.ContentsShow = Backbone.View.extend({

        template: JST['app/scripts/templates/contents/show.ejs'],

        render: function() {
            this.$el.html(this.template({
                model: this.model
            }));
            return this;
        },

        events: {
            'click .btn-back': 'back',
            'click #add-favorite': 'addFavorite'
        },

        addFavorite: function(event) {
            event.preventDefault();
            var id = this.model.id,
                model = App.Favorites.findWhere({
                    favoriteId: id
                });

            if (!model) {
                App.Favorites.create({
                    favoriteId: this.model.id
                });
                return this.render();
            }

            /**
             * Remove model from collection and local storage
             */
            model.destroy();

            /**
             * Update view
             */
            return this.render();
        },

        back: function() {
            window.history.back();
            return false;
        }
    });
})();
