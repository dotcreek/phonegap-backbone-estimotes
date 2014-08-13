/**
 * Backbone Router
 */
App.Router = Backbone.Router.extend({

    initialize: function() {
        App.slider = new PageSlider($('body'));
    },

    routes: {

        /**
         * Static pages and Home
         */
        '': 'home',
        'settings': 'settings',

        /**
         * This route must be at the end of this object
         */
        '*404': 'notFound'
    },

    home: function() {
        console.log('home');
        'use strict';
        /**
         * Since the home view never changes, we instantiate it and render
         * it only once
         */
        App.Views.home = new App.Views.Home();
        App.slider.slidePage(App.Views.home.render().$el);
    },

    settings: function() {
        console.log('settings');
        App.slider.slidePage(new App.Views.Settings().render().$el);
    }
});
