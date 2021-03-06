/**
 * Backbone Router
 */
App.Router = Backbone.Router.extend({

    initialize: function () {
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
    cleanView: function (view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.currentView = view;
    },

    home: function () {
        'use strict';
        var view = new App.Views.Home();
        App.slider.slidePage(view.render().$el);
        this.cleanView(view);
    },

    settings: function () {
        var view = new App.Views.Settings();
        App.slider.slidePage(view.render().$el);
        this.cleanView(view);
    },

    rooms: function () {
        var collection = new App.Collections.Room({});
        collection.fetch({
            headers: {
                auth_token: '2cc5bc9c-e407-4fbb-826f-ed4d92df603e'
            }
        }).done(_.bind(function () {
            console.log("fetching rooms");
            var view = new App.Views.Rooms({
                collection: collection
            });
            App.slider.slidePage(view.render().$el);
            this.cleanView(view);
        }, this));
    }
});
