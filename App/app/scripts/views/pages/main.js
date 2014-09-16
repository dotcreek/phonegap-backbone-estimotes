(function() {
    'use strict';

    App.Views.Main = Backbone.View.extend({
        rendered: false,

        initialize: function(collectionName) {
            this.collection = new App.Collections[collectionName]();
            this.listenTo(this.collection, 'sort', this.addAll);
            this.listenTo(this.collection, 'remove', this.removeModel);
            this.listenTo(this.collection, 'sync', this.handleSuccess);
            this.loader = $('.loader-spinner');
            this.fetchCollection();
            setInterval(_.bind(this.fetchCollection, this), 60000*10);
        },

        render: function() {
            this.beforeRender();
            if (!this.rendered) {
                this.rendered = true;
                this.$el.html(this.template());
                this.listSelector = this.$el.find('.append-list');
            } else {
                this.fetchCollection();
            }
            this.afterRender();
            return this;
        },

        beforeRender: function() {

        },

        afterRender: function() {

        },

        removeModel: function(model) {
            model.trigger('destroy', model);
        },

        addOne: function() {

        },

        addAll: function() {
            this.listSelector.html('');
            this.collection.each(this.addOne, this);
        },

        handleSuccess: function() {
            this.loader.hide();
            // this.collection.sort();
        },

        fetchCollection: function() {
            if (!this.collection.length) {
                this.loader.show();
            }
            this.collection.fetch({
                cache: true,
                // reset: true,
                expires: App.config.cacheExpire,
                data: {
                    currentTime: new Date().toISOString()
                },
                error: _.bind(function(error, status) {
                    this.loader.hide();
                    // temporal
                    if (status && status.statusText) {
                        // App.noConnectionAlert(status, status.statusText);
                    } else {
                        console.log('there was an error:', error);
                    }
                }, this)
            });
        }
    });
})();
