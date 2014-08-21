/**
 * Backbone Router
 */
'use strict';
App.Router = Backbone.Router.extend({

    initialize: function() {
        App.slider = new PageSlider($('body'));
        this.currentView = null;
    },

    routes: {

        /**
         * Static pages and Home
         */
        '': 'home',
        'settings': 'settings',
        'rooms': 'rooms',
        'rooms/:id': 'showRoom',

        /**
         * This route must be at the end of this object
         */
        '*404': 'notFound'
    },

    /**
     * Remove events associated to a view
     * Un-delegate events associated to a view
     * @param  {Object} view A Backbone View instance
     */
    cleanView: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.currentView = view;
    },

    home: function() {
        var view = new App.Views.Home();
        App.slider.slidePage(view.render().$el);
        this.cleanView(view);
    },

    settings: function() {
        var view = new App.Views.Settings();
        App.slider.slidePage(view.render().$el);
        this.cleanView(view);
    },

    rooms: function() {
        var self = this;
        var collection = new App.Collections.Room({});
        collection.fetch({
            success: function() {
                var view = new App.Views.Rooms({
                    collection: collection
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error) {
                /**
                 * Do something with the error
                 */
                console.log(error);
            }
        });
    },

    showRoom: function(id) {
        var self = this;
        var model = new App.Models.Room({
            id: id
        });

        model.fetch({
            success: function() {
                var view = new App.Views.RoomsShow({
                    model: model
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error) {
                console.log(error);
            }
        });
    }
});