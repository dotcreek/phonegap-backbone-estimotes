/**
 * Basic and start configuration for our project
 * @type {Object}
 */
window.App = {
    /**
     * Store all Backbone models instances
     * @type {Object}
     */
    Models: {},

    /**
     * Store all Backbone collection instances
     * @type {Object}
     */
    Collections: {},

    /**
     * Store all Backbone views
     * @type {Object}
     */
    Views: {},
    Router: {},

    /**
     * Main config
     * @type {Object}
     */
    config: {

        /**
         * Document selector used on Backbone views as 'el' elment
         * @type {String}
         */
        el: document.getElementById('page'),

        /**
         * API URL
         * @type {String}
         */
        api: 'http://localhost:4000/',

        /**
         * Min value for start searching values to API or autocomplete fields
         * @type {Number}
         */
        minSearch: 3,
    },

    /**
     * Awesome utils
     * @type {Object}
     */
    utils: {

        /**
         * $('selector').empty() but with vanilla js and a lot faster
         */
        empty: function(id) {
            'use strict';
            var wrap = document.getElementById(id);
            while (wrap.firstChild) {
                wrap.removeChild(wrap.firstChild);
            }
        }
    },

    /**
     * Initialize all requirements
     */
    init: function() {
        'use strict';
        var router;

        /**
         *  Set 'el' for all views,
         */
        Backbone.View.prototype.el = App.config.el;

        /**
         * Override remove function from View
         * @return {Object} view instance
         */
        Backbone.View.prototype.remove = function() {
            this.$el.html('');
            this.stopListening();
            this.undelegateEvents();
            return this;
        };

        /**
         * Bakcbone Router
         */
        App.Router = Backbone.Router.extend({

            /**
             * Removes events, content and view itself of current view
             * @param  {Object} view    View instance to display
             * @param  {Object} options i.e: {id: 'an id'}
             */
            displayView: function(view, options) {
                console.log(['Route: ', Backbone.history.fragment].join(''));

                /**
                 * If there's a currentView, remove events and set html to ''
                 * By default backbone do not remove content, we override its
                 * prototype.remove earlier
                 */
                if (this.currentView) {
                    this.currentView.unbind().remove();
                }

                /**
                 * Store current view
                 * @type {Object}
                 */
                this.currentView = view;

                /**
                 * Display view
                 */
                view.render(options);
            },

            routes: {

                /**
                 * Static pages and Home
                 */
                '': 'home',

                /**
                 * This route must be at the end of this object
                 */
                '*404': 'notFound'
            }
        });

        router = new App.Router();

        /**
         * Triggered when visit /
         */
        router.on('route:home', function() {
            return this.displayView(new App.Views.Home());
        });

        /**
         * Any non registered route, besides 404! :D
         */
        router.on('route:notFound', function() {
            return this.displayView(new App.Views.NotFound());
        });

        /**
         * Start listening route changes
         */
        Backbone.history.start();
    },
};

/**
 * Start application
 */
$(document).ready(function() {
    App.init();
});
