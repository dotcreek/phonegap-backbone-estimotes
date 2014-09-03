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
                alert('Error');
            };
            if (navigator.globalization) {
                return navigator.globalization.getLocaleName(success, error);
            }
            return callback('ES');
        },

        convertDate: function(dates) {
            'use strict';
            var date, day, hour, minutes, newDate = '';
            for (var i = 0; i < dates.length; i++) {
                date = moment(dates[i]).tz('America/Costa_Rica');
                hour = date.hour();
                minutes = '';
                if (date.minutes().toString().length < 2) {
                    minutes = '0' + date.minutes();
                } else {
                    minutes = date.minutes();
                }
                newDate += hour + ':' + minutes + ' -';
            };
            day = date._locale._weekdays[date.days()];
            newDate = newDate.substring(0, newDate.length - 1);
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
        var language = App.utils.getLanguaje(function(lang) {
            App.polyglot.extend(languages[lang]);
            lang.toLowerCase();
            moment.locale(lang);
        });

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
