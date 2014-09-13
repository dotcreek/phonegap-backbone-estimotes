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
        api: 'http://summit.dotcreek.com/',

        /**
         * Min value for start searching values to API or autocomplete fields
         * @type {Number}
         */
        minSearch: 3,

        /**
         * Number of seconds for the ajax requests to timeout
         *
         * @type {Number}
         */
        ajaxTimeOut: 5,
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

        getMomentDate: function(date) {
            'use strict';
            var momentDate;
            momentDate = moment(date).tz('America/Costa_Rica');

            return momentDate;
        },

        convertDate: function(date, method) {
            'use strict';

            var options = {
                day: function(date) {
                    var moment = App.utils.getMomentDate(date);
                    return moment.date();
                },
                dayString: function(date) {
                    var moment = App.utils.getMomentDate(date);
                    var day;
                    day = moment._locale._weekdays[moment.days()];
                    day = day.substring(0, 1).toUpperCase() + day.substring(1);
                    return day;
                },
                dayStringShort: function(date) {
                    var moment = App.utils.getMomentDate(date);
                    var day;
                    day = moment._locale._weekdaysShort[moment.days()];
                    return day.toUpperCase();
                },
                times: function(date) {
                    var moment, hours = '';
                    for (var i = 0; i < date.length; i++) {
                        moment = App.utils.getMomentDate(date[i]);
                        if (moment._locale._abbr === 'es') {
                            moment.locale('en');
                            hours += moment.format('LT') + ' - ';
                            moment.locale('es');
                        } else {
                            hours += moment.format('LT') + ' - ';
                        }
                    }

                    hours = hours.substring(0, hours.length - 2);
                    return hours;
                },
                month: function(date) {
                    var moment = App.utils.getMomentDate(date);
                    return moment._locale._monthsShort[moment.month()];

                }
            };

            return options[method](date);


            //get name of day

            // return day + ' ' + newDate;
        }
    },

    init: function() {
        'use strict';
        $.ajaxSetup({
            timeout: (App.config.ajaxTimeOut * 1000)
        });
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
            if (navigator.splashscreen) {
                //once we are ready to show the app, show the splash
                //for 3 seconds and then hide
                setTimeout(function() {
                    navigator.splashscreen.hide();
                    /**
                     * Instantiate Favorites collection
                     * @type {App}
                     */
                    App.Favorites = new App.Collections.Favorites();

                    /**
                     * Fetch favorites from local storage
                     */
                    App.Favorites.fetch();
                    Backbone.history.start();
                }, 3000);
            } else {
                /**
                 * Instantiate Favorites collection
                 * @type {App}
                 */
                App.Favorites = new App.Collections.Favorites();

                /**
                 * Fetch favorites from local storage
                 */
                App.Favorites.fetch();
                Backbone.history.start();

            }
        });
    },
    noConnectionAlert: function(statusError, statusText) {
        'use strict';
        if (navigator.notification) {
            navigator.notification.alert(
                App.polyglot.t('utils.error-no-conectivity'),
                function() {},
                App.polyglot.t('utils.error-no-conectivity-title'),
                'Ok'
            );
            navigator.app.exitApp();
        } else {
            alert(App.polyglot.t('utils.error-no-conectivity'));
        }
        console.log('noConnectionAlert:' + statusError + ' ' + statusText);
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
