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
                /**
                 * Create a clone of current model properties
                 */
                var obj = _.clone(this.model.attributes);

                /**
                 * Store current model id as favoriteId
                 */
                obj.favoriteId = this.model.id;

                /**
                 * Remove id from object cloned
                 */
                delete obj.id;

                /**
                 * Create a new object attached to Favorites collection
                 */
                App.Favorites.create(obj);

                /**
                 * Update the view
                 */
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
