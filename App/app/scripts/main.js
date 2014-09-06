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

    /**
     * Main config
     * @type {Object}
     */
    config: {

        /**
         * API URL
         * @type {String}
         */
        // api: 'http://localhost:4000/',
        api: 'https://summit.dotcreek.com:4000/',

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
        },

        getLanguaje: function(callback) {
            'use strict';
            var lang = '';
            var iso = '';
            var success = function(locale) {
                lang = locale.value.split('-');
                iso = lang[0].toUpperCase();
                return callback(iso);
            };
            var error = function() {
                console.log('Error loading locale');
            };
            // try to identify the phone's locale
            if (navigator.globalization) {
                return navigator.globalization.getLocaleName(success, error);
            }
            // responding with a default locale
            return callback('ES');
        },

        convertDate: function(dates) {
            'use strict';
            var date, day, newDate = '';
            for (var i = 0; i < dates.length; i++) {
                date = moment(dates[i]).tz('America/Costa_Rica');
                if (date._locale._abbr === 'es') {
                    date.locale('en');
                    newDate += date.format('LT') + ' - ';
                    date.locale('es');
                } else {
                    newDate += date.format('LT') + ' - ';
                }

            }
            //get name of day
            day = date._locale._weekdays[date.days()];
            day = day.substring(0, 1).toUpperCase() + day.substring(1);

            newDate = newDate.substring(0, newDate.length - 2);
            return day + ' ' + newDate;
        }
    },

    init: function() {
        'use strict';
        /**
         * Override remove function from View
         * @return {Object} view instance
         */
        Backbone.View.prototype.remove = function() {
            // this.$el.html('');
            this.stopListening();
            this.undelegateEvents();
            return this;
        };

        new App.Router();
        App.polyglot = new Polyglot();
        /**
         * Get language here, should be either ES or EN by now
         */
        App.utils.getLanguaje(function(lang) {
            App.polyglot.extend(languages[lang]);
            lang.toLowerCase();
            //set locale to moment.js
            moment.locale(lang);
            //once we are ready to show the app, show the splash
            //for 3 seconds and then hide
            setTimeout(function() {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
            }, 3000);
        });

        /**
         * Instantiate Favorites collection
         * @type {App}
         */
        App.Favorites = new App.Collections.Favorites();

        /**
         * Fetch favorites from local storage
         */
        App.Favorites.fetch();

        /**
         * Instantiate Backbone.
         */
        Backbone.history.start();
    }
};

if (!PHONEGAP) {
    /**
     * Start application
     */
    $(document).ready(function() {
        'use strict';
        App.init();
    });
}
