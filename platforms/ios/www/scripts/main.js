languages.ES = languages.ES || {};
languages.ES.pages = {};
languages.ES.rooms = {
    "rooms": "Salas",
    "current": "Evento actual",
    "current-events": "Eventos actuales",
    "upcoming": "Siguiente evento",
    "upcoming-events": "Siguientes eventos",
    "no_current_events": "No hay eventos en este momento",
    "no_upcoming_events": "No hay más eventos"
}
;
languages.ES.utils = {
    "home": "Agenda",
    "settings": "Acerca",
    "profile": "Perfil",
    "favorites": "Favoritos",
    "refresh": "Recargar",
    "languages": "Lenguage",
    "notifications": "Notificaciones",
    "about": "Acerca del SCT Summit 2014",
    "about_credits": "Creditos",
    "english": "Inglés",
    "notify": "Notificar cambios",
    "error-no-conectivity": "Hubo un error de conexión, intente más tarde.",
    "error-no-conectivity-title": "No hay conexión",
}
;

languages.EN = languages.EN || {};
languages.EN.pages = {};
languages.EN.rooms = {
    "rooms": "Rooms",
    "current": "Current Event",
    "current-events": "Current Events",
    "upcoming": "Upcoming Event",
    "upcoming-events": "Upcoming Events",
    "no_current_events": "No current events",
    "no_upcoming_events": "No upcoming events"

}
;
languages.EN.utils = {
    "home": "Agenda",
    "settings": "About",
    "profile": "Profile",
    "favorites": "Favorites",
    "refresh": "Refresh",
    "languages": "Language",
    "notifications": "Notifications",
    "about": "About the SCT Summit 2014",
    "about_credits": "Credits",
    "english": "English",
    "notify": "Notify changes",
    "error-no-conectivity": "There was a connectivity error. Please try again later.",
    "error-no-conectivity-title": "No conectivity"
}
;

/* Notes:
 * - History management is currently done using window.location.hash.
 *   This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */
window.PageSlider = function (container) {
    'use strict';
    /**
     * currentPage comes from ratchet as a function/object
     */
    var currentPage,
        stateHistory = [];

    this.back = function () {
        location.hash = stateHistory[stateHistory.length - 2];
    };

    /**
     * Use this function if you want PageSlider to automatically determine
     * the sliding direction based on the state history
     * @param  {Object} page A render result of a backbone view instance
     * @return {Function}    A call to slidePageFrom
     */
    this.slidePage = function (page) {
        if (!page) {
            return;
        }

        var length = stateHistory.length,
            state = window.location.hash;

        console.log('route:', state);
        if (length === 0) {
            stateHistory.push(state);
            return this.slidePageFrom(page);
        }

        if (state === stateHistory[length - 2]) {
            stateHistory.pop();
            return this.slidePageFrom(page, 'left');
        }

        stateHistory.push(state);
        return this.slidePageFrom(page, 'right');
    };

    /**
     * Use this function directly if you want to control the sliding
     * direction outside PageSlider
     * @param  {Object} page An instance of backbone view rendered
     * @param  {String} from left or right
     */
    this.slidePageFrom = function (page, from) {
        container.append(page);

        if (!currentPage || !from) {
            page.attr('class', 'page center');
            currentPage = page;
            return;
        }

        // Position the page at the starting position of the animation
        page.attr('class', 'page ' + from);

        currentPage.one('webkitTransitionEnd', function (e) {
            $(e.target).remove();
        });

        /**
         * Force reflow
         * @ref http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
         */
        container[0].offsetWidth;

        /**
         * Position the new page and the current page at the ending position of
         * their animation with a transition class indicating the duration of
         * the animation
         */
        page.attr('class', 'page transition center');
        var direction = from === 'left' ? 'right' : 'left';

        currentPage.attr('class', 'page transition ' + direction);
        currentPage = page;
    };
};

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
        api: 'http://summit.dotcreek.com:4000/',

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
        } else {
            alert(App.polyglot.t('utils.error-no-conectivity'));
        }
        navigator.app.exitApp();
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
            App.noConnectionAlert(status, status.statusText);
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

        document.body.className = 'fav';
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

                document.body.className = 'home';

                /**
                 * Clean view
                 */
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error, status);
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

        document.body.className = 'info';
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

                document.body.className = 'list';
                /**
                 * Clean View
                 */
                self.cleanView(view);
            },

            error: function(error, status) {
                //TODO: find a DRYer way to handle all errors
                self.handleErrors(error, status);
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
                self.handleErrors(error, status);
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
                self.handleErrors(error, status);
            }
        });
    }
});

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/contents/show.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<header class="bar bar-nav">\n<a class="icon icon-left-nav pull-left btn-back"></a>\n<a class="icon ' +
((__t = ( model.isFavorite() )) == null ? '' : __t) +
' pull-right" id="add-favorite"></a>\n<h1 class="title truncated">' +
__e( model.get('description') ) +
'</h1>\n</header><div class="content">\n<ul class="table-view">\n<li class="table-view-cell media">\n<div class="media-body">\n';
 model.get('events').forEach(function (event) { ;
__p += '\n';
 if (event.id === model._previousAttributes.eventId) {;
__p += '\n<h4 class="room-name">\n' +
__e( event.room.name ) +
'\n</h4>\n<p class="content-date">\n' +
__e( App.utils.convertDate([event.startAt, event.endAt],'times') ) +
'\n</p>\n';
 } ;
__p += '\n';
 });
__p += '\n<p>\n' +
((__t = ( model.get('content') )) == null ? '' : __t) +
'\n</p>\n</div>\n</li>\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/favorites/index.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( JST['app/scripts/templates/partials/_navigation.ejs']({
nav: 'favorites',
title: 'utils.favorites'
}) )) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view rooms-home">\n';
 collection.forEach(function(item){ ;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e( item.get("favoriteId")) +
'/' +
__e( item.get("eventId")) +
'\'>\n<div class="media-body">\n<p class="content-hour">\n' +
__e( App.utils.convertDate([item.get('startAt'), item.get('endAt')],'times') ) +
'\n</p>\n<h4 class="content-title">\n' +
__e( item.get('description') ) +
'\n</h4>\n' +
((__t = ( item.get('content') )) == null ? '' : __t) +
'\n</div>\n</a>\n</li>\n';
 }) ;
__p += '\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/pages/home.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( JST['app/scripts/templates/partials/_navigation.ejs']({
nav: 'home',
title: 'utils.home'
}) )) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view rooms-home">\n';
 collection.forEach(function(item){ ;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e( item.get("contentId")) +
'/' +
__e( item.get("id")) +
'\'>\n<div class="media-body">\n<h4 class="room-name">\n' +
__e( item.get('room').name ) +
'\n</h4>\n<div class="room-content">\n<p class="content-date">\n' +
__e( App.utils.convertDate([item.get('startAt'), item.get('endAt')],'times') ) +
'\n</p>\n<h4 class="content-title">\n' +
__e( item.get('content').description ) +
'\n</h4>\n</div>\n</div>\n</a>\n</li>\n';
 });
__p += '\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/pages/settings.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( JST['app/scripts/templates/partials/_navigation.ejs']({
nav: 'settings',
title: 'utils.settings'
}) )) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view">\n<!--         <li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.languages') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell">\n<span class="media-object pull-left fa fa-language"></span>\n' +
((__t = ( App.polyglot.t('utils.english') )) == null ? '' : __t) +
'\n<div class="toggle" id="language">\n<div class="toggle-handle"></div>\n</div>\n</li>\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.notifications') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<span class="media-object pull-left fa fa-bullhorn"></span>\n' +
((__t = ( App.polyglot.t('utils.notify') )) == null ? '' : __t) +
'\n<div class="toggle">\n<div class="toggle-handle"></div>\n</div>\n</li>About -->\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.about') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<div class="media-body">\n<p>\nSan Carlos Technology Summit es el primer y único evento de referencia y actualización tecnológica dirigido a la Región Huetar Norte de Costa Rica, creado por las principales empresas, organizaciones y centros de educación universitaria de San Carlos relacionados con el sector tecnológico.\n</p>\n<p>\nMás en <a href="http://www.sancarlostechnologysummit.com/">www.sancarlostechnologysummit.com</a>\n</p>\n</div>\n</li>\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.about_credits') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<div class="media-body">\n<p>\nDesarrollado por DotCreek, especificamente gracias a:\n<ul>\n<li>Lester Angulo</li>\n<li>Allan Sibaja</li>\n<li>Hanzel Cruz</li>\n<li>Francisco Quesada</li>\n<li>Guillermo Arias</li>\n<li>Elizabeth Salas</li>\n</ul>\n</p>\n</div>\n</li>\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/partials/_navigation.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="bar ios-title">\n';
 if(title){ ;
__p += '\n<h1 class="title">' +
((__t = ( App.polyglot.t(title) )) == null ? '' : __t) +
'</h1>\n';
 } else { ;
__p += '\n<h1 class="title">' +
((__t = ( App.polyglot.t('utils.home') )) == null ? '' : __t) +
'</h1>\n';
 } ;
__p += '\n</nav>\n<header class="bar bar-tab">\n<a class="tab-item home ' +
((__t = ( nav === 'home' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-home"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('utils.home') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item list ' +
((__t = ( nav === 'rooms' ? 'active' : '' )) == null ? '' : __t) +
'" href="#rooms">\n<span class="icon icon-list"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('rooms.rooms') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item star ' +
((__t = ( nav === 'favorites' ? 'active' : '' )) == null ? '' : __t) +
'" href="#favorites">\n<span class="icon icon-star"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('utils.favorites') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item info ' +
((__t = ( nav === 'settings' ? 'active' : '' )) == null ? '' : __t) +
'" href="#settings">\n<span class="icon icon-info"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('utils.settings') )) == null ? '' : __t) +
'</span>\n</a>\n</header>';

}
return __p
};

this["JST"]["app/scripts/templates/rooms/index.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( JST[ 'app/scripts/templates/partials/_navigation.ejs']({
nav: 'rooms',
title: 'rooms.rooms'
}))) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view rooms-index">\n';
 collection.forEach(function(item){ ;
__p += '\n<li class="table-view-cell media">\n<a class="navigate-right" href=\'#rooms/' +
__e( item.get("id")) +
'\'>\n<div class="media-body">\n<h4>\n' +
__e(item.get( 'name') ) +
'\n</h4>';
 if(item.currentEvent){ ;
__p += '\n<p>' +
((__t = ( App.polyglot.t('rooms.current') )) == null ? '' : __t) +
': ' +
__e( item.currentEvent.content.description ) +
'</p>\n';
 }else{ ;
__p += '\n<p>' +
((__t = ( App.polyglot.t('rooms.no_current_events') )) == null ? '' : __t) +
'</p>\n';
 } ;

 if(item.upcomingFirst){ ;
__p += '\n<p>' +
((__t = ( App.polyglot.t('rooms.upcoming') )) == null ? '' : __t) +
': ' +
__e( item.upcomingFirst.content.description ) +
'</p>\n';
 }else{ ;
__p += '\n<p>' +
((__t = ( App.polyglot.t('rooms.no_upcoming_events') )) == null ? '' : __t) +
'</p>\n';
 } ;
__p += '\n</div>\n</a>\n</li>\n';
 }) ;
__p += '\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/rooms/map.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header class="bar bar-nav">\n<a class="icon icon-left-nav pull-left btn-back"></a>\n<h1 class="title"> ' +
((__t = ( name )) == null ? '' : __t) +
'</h1>\n</header><div class="content">\n<img src="' +
((__t = ( img )) == null ? '' : __t) +
'">\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/rooms/show.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<header class="bar bar-nav">\n<a class="icon icon-left-nav pull-left btn-back"></a>\n<a class="icon fa fa-map-marker pull-right" href="#maps/' +
__e( encodeURIComponent(model.get('image'))) +
'&' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'"></a>\n<h1 class="title">' +
__e( model.get("name") ) +
'</h1>\n</header><div class="content show-room">\n<ul class="table-view rooms-show">';
 if(model.currentEvent){ ;
__p += '<li class="table-view-cell table-view-divider event-moment">\n<p>\n' +
((__t = ( App.polyglot.t('rooms.current') )) == null ? '' : __t) +
'\n</p>\n</li>\n<li class="table-view-cell media current-event">\n<a href=\'#contents/' +
__e( model.currentEvent.contentId) +
'/' +
__e( model.currentEvent.id) +
'\'>\n<div class="media-body">\n<p class="content-summary">\n' +
__e( model.currentEvent.summary ) +
'\n</p>\n<p class="content-hour">\n' +
__e( App.utils.convertDate(model.currentEvent.startAt,'dayString')) +
'\n' +
__e( App.utils.convertDate([model.currentEvent.startAt,model.currentEvent.endAt],'times') ) +
'\n</p>\n</div>\n</a>\n</li>';
 } ;

 if(!_.isEmpty(model.upcoming)){ ;
__p += '<li class="table-view-cell table-view-divider event-moment">\n<p>\n' +
((__t = ( App.polyglot.t('rooms.upcoming-events') )) == null ? '' : __t) +
'\n</p>\n</li>\n';
 if (model.upcomingFirst) { ;
__p += '\n<li class="table-view-cell media upcoming-event">\n<a class="navigate-right" href=\'#contents/' +
((__t = (model.upcomingFirst.contentId)) == null ? '' : __t) +
'/' +
((__t = ( model.upcomingFirst.id)) == null ? '' : __t) +
'\'>\n<div class="media-body">\n<div class="date">\n<p class="day-name"> ' +
__e( App.utils.convertDate(model.upcomingFirst.startAt,'dayStringShort')) +
'</p>\n<p class="day"> ' +
__e( App.utils.convertDate(model.upcomingFirst.startAt,'day')) +
'</p>\n<p class="month"> ' +
__e( App.utils.convertDate(model.upcomingFirst.startAt,'month')) +
'</p>\n</div>\n<div class="content-details">\n<p class="content-hour">\n' +
__e( App.utils.convertDate([model.upcomingFirst.startAt,model.upcomingFirst.endAt],'times') ) +
'\n</p>\n<p class="content-summary">\n' +
__e( model.upcomingFirst.summary ) +
'\n</p>\n</div>\n</div>\n</a>\n</li>\n';
 };

 model.upcoming.forEach(function (event) { ;
__p += '\n<li class="table-view-cell media upcoming-event">\n<a class="navigate-right" href=\'#contents/' +
((__t = (event.contentId)) == null ? '' : __t) +
'/' +
((__t = ( event.id)) == null ? '' : __t) +
'\'>\n<div class="media-body">\n<div class="date">\n<p class="day-name"> ' +
__e( App.utils.convertDate(event.startAt,'dayStringShort')) +
'</p>\n<p class="day"> ' +
__e( App.utils.convertDate(event.startAt,'day')) +
'</p>\n<p class="month"> ' +
__e( App.utils.convertDate(event.startAt,'month')) +
'</p>\n</div>\n<div class="content-details">\n<p class="content-hour">\n' +
__e( App.utils.convertDate([event.startAt,event.endAt],'times') ) +
'\n</p>\n<p class="content-summary">\n' +
__e( event.summary ) +
'\n</p>\n</div>\n</div>\n</a>\n</li>\n';
 }) ;

 } else { ;
__p += '\n<li class="table-view-cell table-view-divider">\nNothing to display\n</li>\n';
 } ;
__p += '</ul>\n</div>';

}
return __p
};
(function() {
    'use strict';

    App.Models.Session = Backbone.Model.extend({
        urlRoot: App.config.api + 'sessions',
        defaults: {},
    });
})();

(function() {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: App.config.api + 'rooms',

        defaults: {},

        parse: function(data) {
            this.currentEvent = data.currentEvent;
            if (_.isEmpty(data.currentEvent)) {
                this.currentEvent = false;
            }
            this.upcoming = data.upcoming || [];
            this.upcomingFirst = data.upcoming ? data.upcoming[0] : false;
            if (this.upcomingFirst) {delete data.upcoming[0];}

            return data;
        }
    });
})();

(function() {
    'use strict';

    App.Models.Event = Backbone.Model.extend({

        urlRoot: App.config.api + 'events',
        defaults: {}
    });
})();

(function() {
    'use strict';

    App.Models.Favorite = Backbone.Model.extend({
        urlRoot: App.config.api + 'favorites',
        defaults: {
            favoriteId: ''
        }
    });
})();

(function() {
    'use strict';

    App.Models.Content = Backbone.Model.extend({

        urlRoot: App.config.api + 'contents',

        defaults: {},

        isFavorite: function() {
            var model = App.Favorites.findWhere({
                favoriteId: this.get('id')
            });

            if (model) {
                return 'icon-star-filled';
            }
            return 'icon-star';
        }
    });
})();

(function() {
    'use strict';

    App.Collections.Events = Backbone.Collection.extend({

        model: App.Models.Event,

        url: App.config.api + 'events'

    });

})();

(function() {
	'use strict';

	App.Collections.Rooms = Backbone.Collection.extend({

		model: App.Models.Room,

		url: App.config.api + 'rooms',

		parse: function(data) {
			if (_.isArray(data)) {
				return data;
			}
			return data.rooms;
		}
	});
})();

(function() {
    'use strict';

    App.Collections.Favorites = Backbone.Collection.extend({
        url: App.config.api + 'favorites',
        localStorage: new Backbone.LocalStorage('Favorites'),
        model: App.Models.Favorite
    });
})();

(function() {
    'use strict';

    App.Views.Home = Backbone.View.extend({

        template: JST['app/scripts/templates/pages/home.ejs'],

        render: function() {
            this.$el.html(this.template({
                collection: this.collection
            }));
            return this;
        }
    });
})();

(function() {
    'use strict';

    App.Views.Settings = Backbone.View.extend({

        template: JST['app/scripts/templates/pages/settings.ejs'],

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
})();

(function() {
    'use strict';

    App.Views.Rooms = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/index.ejs'],

        render: function() {
            this.$el.html(this.template({
                collection: this.collection
            }));
            return this;
        }
    });
})();

(function() {
    'use strict';

    App.Views.RoomsShow = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/show.ejs'],

        render: function() {
            this.$el.html(this.template({
                model: this.model
            }));
            return this;
        },

        events: {
            'click .btn-back': 'back'
        },

        back: function() {
            window.history.back();
            return false;
        }
    });
})();

(function() {
    'use strict';

    App.Views.RoomsMap = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/map.ejs'],

        render: function(options) {
            this.$el.html(this.template({
                img: options.img,
                name: options.name
            }));
            return this;
        },

        events: {
            'click .btn-back': 'back'
        },

        back: function() {
            window.history.back();
            return false;
        }
    });
})();

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

(function() {
    'use strict';

    App.Views.Favorites = Backbone.View.extend({

        template: JST['app/scripts/templates/favorites/index.ejs'],

        render: function() {
            this.$el.html(this.template({
                collection: this.collection
            }));
            return this;
        }
    });
})();
