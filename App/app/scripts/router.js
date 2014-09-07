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

        /**
         * GET /rooms
         */
        'rooms': 'rooms',

        /**
         * GET /rooms/:id
         */
        'rooms/:id': 'showRoom',

        /**
         * GET /rooms/:id
         */
        'maps/:query': 'roomMap',

        /**
         * GET /contents/:id
         */
        'contents/:id/:eventId': 'showContent',

        /**
         * GET /favorites
         */
        'favorites': 'favorites',

        /**
         * This route must be at the end of this object
         */
        '*404': 'notFound'
    },

    roomMap: function(query) {
        query = query.split('&');
        /**
         * Instantiate a new Home View
         * use collection just fetched
         */
        var view = new App.Views.RoomsMap({});

        /**
         * Transition to favorites by slide[left/right]
         */
        App.slider.slidePage(view.render({
            img: query[0],
            name: query[1]
        }).$el);

        /**
         * Clean view
         */
        this.cleanView(view);
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

    handleProgress: function(event) {
        var percentComplete = 0;
        if (event.lengthComputable) {
            percentComplete = event.loaded / event.total;
        }
    },

    handleErrors: function(error, status) {
        if (status && status.statusText) {
            App.noConnectionAlert(status);
        } else {
            console.log('there was an error:', error);
        }
    },

    /**
     * Visit /favorites
     */
    favorites: function() {
        var self = this;

        /**
         * Instantiate a new Home View
         * use collection just fetched
         */
        var view = new App.Views.Favorites({
            collection: App.Favorites
        });

        /**
         * Transition to favorites by slide[left/right]
         */
        App.slider.slidePage(view.render().$el);

        /**
         * Clean view
         */
        self.cleanView(view);
    },

    /**
     * Visit /
     */
    home: function() {
        var self = this;

        /**
         * GET /rooms
         */
        new App.Collections.Events({}).fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            // xhr: function() {
            //     var xhr = $.ajaxSettings.xhr();
            //     xhr.onprogress = self.handleProgress;
            //     return xhr;
            // },

            success: function(collection) {

                /**
                 * Instantiate a new Home View
                 * use collection just fetched
                 */
                var view = new App.Views.Home({
                    collection: collection
                });

                /**
                 * Transition to home by slide[left/right]
                 */
                App.slider.slidePage(view.render().$el);

                /**
                 * Clean view
                 */
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error,status);
            }
        });
    },

    /**
     * Visit /#settings
     */
    settings: function() {
        /**
         * Create a new instance of Settings View
         */
        var view = new App.Views.Settings();

        /**
         * Transition to settings
         */
        App.slider.slidePage(view.render().$el);

        /**
         * Clean view
         */
        this.cleanView(view);
    },

    /**
     * Visit /#rooms
     */
    rooms: function() {
        var self = this;

        /**
         * GET /rooms
         */
        new App.Collections.Rooms({}).fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            success: function(collection) {
                /**
                 * Instantiate a new Rooms View
                 * using collection fetched
                 */
                var view = new App.Views.Rooms({
                    collection: collection
                });

                /**
                 * Slide View left/right
                 */
                App.slider.slidePage(view.render().$el);

                /**
                 * Clean View
                 */
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error,status);
            }
        });
    },

    showRoom: function(id) {
        var self = this;
        var model = new App.Models.Room({
            id: id
        });

        /**
         * GET /rooms/:id
         */
        model.fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            success: function() {
                var view = new App.Views.RoomsShow({
                    model: model
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error,status);
            }
        });
    },

    showContent: function(id, eventId) {
        var self = this;
        var model = new App.Models.Content({
            id: id,
            eventId: eventId
        });

        /**
         * GET /contents/:id
         */
        model.fetch({
            success: function() {
                model.set('eventId', eventId);
                var view = new App.Views.ContentsShow({
                    model: model,
                    eventId: eventId
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error,status);
            }
        });
    }
});
