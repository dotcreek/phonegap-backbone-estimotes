languages.ES = languages.ES || {};
languages.ES.pages = {};
languages.ES.rooms = {
    "rooms": "Salas",
    "current": "Evento actual",
    "current-events": "Eventos actuales",
    "upcoming": "Siguiente evento",
    "upcoming-events": "Siguientes eventos"
}
;
languages.ES.utils = {
    "home": "Inicio",
    "settings": "Configuración",
    "profile": "Perfil",
    "favorites": "Favoritos",
    "refresh": "Recargar",
    "languages": "Lenguage",
    "notifications": "Notificaciones",
    "about": "Acerca de [app name]",

    "english": "Inglés",
    "notify": "Notificar cambios"
}
;

languages.EN = languages.EN || {};
languages.EN.pages = {};
languages.EN.rooms = {
    "rooms": "Rooms",
    "current": "Current Event",
    "current-events": "Current Events",
    "upcoming": "Upcoming Event",
    "upcoming-events": "Upcoming Events"
}
;
languages.EN.utils = {
    "home": "Home",
    "settings": "Configuration",
    "profile": "Profile",
    "favorites": "Favorites"
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
            day = day.substring(0,1).toUpperCase() + day.substring(1);

            newDate = newDate.substring(0, newDate.length - 2);
            return day + ' ' + newDate;
        }
    },

    init: function() {
        'use strict';
        $.ajaxSetup({ timeout: (App.config.ajaxTimeOut * 1000) });
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
                    Backbone.history.start();
                }, 3000);
            } else {
                Backbone.history.start();
            }
        });
    },
    noConnectionAlert: function() {
        if (navigator.notification) {
            navigator.notification.alert(
                'There is no connection to the Summit API, try again later',  // message
                function() {},         // callback
                'No conectivity',            // title
                'Ok'                  // buttonName
            );
        } else {
            alert('There is no connection to the Summit API, try again later');
        }
        console.log('noConnectionAlert');
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
         * GET /contents/:id
         */
        'contents/:id/:eventId': 'showContent',

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

    handleProgress: function(event) {
        var percentComplete = 0;
        if (event.lengthComputable) {
            percentComplete = event.loaded / event.total;
        }
    },

    handleErrors: function(error, status) {
        if (status && status.statusText) {

            switch (status.statusText) {
                case 'timeout':
                    App.noConnectionAlert();
                    break;
                default:
                    App.noConnectionAlert();
            }
        } else {
            console.log('there was an error:', error);
        }
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
                /**
                 * Do something with the error
                 */
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
                /**
                 * Do something with the error
                 */
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
                /**
                 * Do something with the error
                 */
                self.handleErrors(error,status);
            }
        });
    },

    showContent: function(id, eventId) {
        var self = this;
        var model = new App.Models.Content({
            id: id,
            eventId : eventId
        });

        /**
         * GET /contents/:id
         */
        model.fetch({
            success: function() {
                var view = new App.Views.ContentsShow({
                    model: model
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error, status) {
                /**
                 * Do something with the error
                 */
                self.handleErrors(error,status);
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
__p += '<header class="bar bar-nav">\n<button class="btn btn-link btn-back btn-nav pull-left">\n<span class="icon icon-left-nav"></span>\nBack\n</button>\n<h1 class="title">' +
((__t = ( model.get('description') )) == null ? '' : __t) +
'</h1>\n</header>\n<div class="content">\n<ul class="table-view">\n<li class="table-view-cell media">\n<div class="media-body">\n';
 model.get('events').forEach(function (event) { ;
__p += '\n';
 if (event.id === model._previousAttributes.eventId) {;
__p += '\n<h4 class="room-name">\n' +
__e( event.room.name) +
'\n</h4>\n<p class="content-date">\n' +
__e( App.utils.convertDate([event.startAt, event.endAt]) ) +
'\n</p>\n';
 } ;
__p += '\n';
 });
__p += '\n<p>\n' +
__e(model.get( 'content') ) +
'\n</p>\n</div>\n</li>\n</ul>\n</div>';

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
 var currentTitle = true, upcomingTitle = true; ;
__p += '\n';
 collection.forEach(function(item){ ;
__p += '\n';
 var now = new Date(), date = new Date(item.get('startAt'));;
__p += '\n';
 if ( date <= now) { ;
__p += '\n';
 if (currentTitle) {;
__p += '\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('rooms.current-events') )) == null ? '' : __t) +
'\n</li>\n';
 } ;
__p += '\n';
 currentTitle = false ;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e( item.get("contentId")) +
'/' +
__e( item.get("id")) +
'\'>\n<div class="media-body">\n<h4 class="content-title">\n' +
__e( item.get('content').description ) +
'\n</h4>\n<h4 class="room-name">\n' +
__e( item.get('room').name ) +
'\n</h4>\n<p class="content-date">\n' +
__e( App.utils.convertDate([item.get('startAt'), item.get('endAt')]) ) +
'\n</p>\n</div>\n</a>\n</li>\n';
 }else{ ;
__p += '\n';
 if (upcomingTitle) {;
__p += '\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('rooms.upcoming-events') )) == null ? '' : __t) +
'\n</li>\n';
 } ;
__p += '\n';
 upcomingTitle = false;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e( item.get("contentId")) +
'/' +
__e( item.get("id")) +
'\'>\n<div class="media-body">\n<h4 class="content-title">\n' +
__e( item.get('content').description ) +
'\n</h4>\n<h4 class="room-name">\n' +
__e( item.get('room').name ) +
'\n</h4>\n<p class="content-date">\n' +
__e( App.utils.convertDate([item.get('startAt'), item.get('endAt')]) ) +
'\n</p>\n</div>\n</a>\n</li>\n';
 };
__p += '\n';
 }) ;
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
'<div class="content">\n<ul class="table-view">\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.languages') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell">\n<span class="media-object pull-left fa fa-language"></span>\n' +
((__t = ( App.polyglot.t('utils.english') )) == null ? '' : __t) +
'\n<div class="toggle">\n<div class="toggle-handle"></div>\n</div>\n</li>\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.notifications') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<span class="media-object pull-left fa fa-bullhorn"></span>\n' +
((__t = ( App.polyglot.t('utils.notify') )) == null ? '' : __t) +
'\n<div class="toggle">\n<div class="toggle-handle"></div>\n</div>\n</li><!-- About -->\n<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('utils.about') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<div class="media-body">\nApp Name\n<p>\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\neiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor\nsit amet.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\neiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor\nsit amet.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\neiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor\nsit amet.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\neiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor\nsit amet.\n</p>\n</div>\n</li>\n</ul>\n</div>';

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
__p += '\n</nav>\n<header class="bar bar-tab">\n<a class="tab-item ' +
((__t = ( nav === 'home' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-home"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('utils.home') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'favorites' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-star-filled"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('utils.favorites') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'rooms' ? 'active' : '' )) == null ? '' : __t) +
'" href="#rooms">\n<span class="icon icon-list"></span>\n<span class="tab-label">' +
((__t = ( App.polyglot.t('rooms.rooms') )) == null ? '' : __t) +
'</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'settings' ? 'active' : '' )) == null ? '' : __t) +
'" href="#settings">\n<span class="icon icon-gear"></span>\n<span class="tab-label">' +
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
__p += '\n<p>No Current Event</p>\n';
 } ;

 if(item.upcomingFirst){ ;
__p += '\n<p>' +
((__t = ( App.polyglot.t('rooms.upcoming') )) == null ? '' : __t) +
': ' +
__e( item.upcomingFirst.content.description ) +
'</p>\n';
 }else{ ;
__p += '\n<p>No Upcoming Events</p>\n';
 } ;
__p += '\n</div>\n</a>\n</li>\n';
 }) ;
__p += '\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/rooms/show.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<header class="bar bar-nav">\n<button class="btn btn-link btn-back btn-nav pull-left">\n<span class="icon icon-left-nav"></span>\nBack\n</button>\n<h1 class="title">' +
__e( model.get("name") ) +
'</h1>\n</header><div class="content show-room">\n<ul class="table-view rooms-show">';
 if(model.currentEvent){ ;
__p += '<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('rooms.current') )) == null ? '' : __t) +
'\n</li>\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e( model.currentEvent.contentId) +
'/' +
__e( model.currentEvent.id) +
'\'>\n<div class="media-body">\n<h4 class="content-title">\n' +
__e( model.currentEvent.content.description || 'No Current Event :(' ) +
'\n</h4>\n<p>\n' +
__e( model.currentEvent.summary ) +
'\n</p>\n<p class="content-date">\n' +
__e( App.utils.convertDate([model.currentEvent.startAt,model.currentEvent.endAt]) ) +
'\n</p>\n</div>\n</a>\n</li>';
 } ;

 if(!_.isEmpty(model.upcoming)){ ;
__p += '<li class="table-view-cell table-view-divider">\n' +
((__t = ( App.polyglot.t('rooms.upcoming-events') )) == null ? '' : __t) +
'\n</li>';
 if (model.upcomingFirst) { ;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
__e(model.upcomingFirst.contentId) +
'/' +
__e( model.upcomingFirst.id) +
'\'>\n<div class="media-body">\n<h4 class="content-title">\n' +
__e( model.upcomingFirst.content.description || 'No Current Event :(' ) +
'\n</h4>\n<p>\n' +
__e( model.upcomingFirst.summary ) +
'\n</p>\n<p class="content-date">\n' +
__e( App.utils.convertDate([model.upcomingFirst.startAt,model.upcomingFirst.endAt]) ) +
'\n</p>\n</div>\n</a>\n</li>\n';
 };

 model.upcoming.forEach(function (event) { ;
__p += '\n<li class="table-view-cell media">\n<a href=\'#contents/' +
((__t = (event.contentId)) == null ? '' : __t) +
'/' +
((__t = ( event.id)) == null ? '' : __t) +
'\'>\n<h4 class="content-title">\n' +
__e( event.content.description ) +
'\n</h4>\n</a>\n</li>\n';
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
        url: '',
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

    App.Views.ContentsShow = Backbone.View.extend({

        template: JST['app/scripts/templates/contents/show.ejs'],

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

(function () {
    'use strict';

    App.Models.Content = Backbone.Model.extend({

        urlRoot: App.config.api + 'contents',

        defaults: {}
    });

})();

/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Event = Backbone.Model.extend({

        urlRoot: App.config.api + 'events',

        defaults: {
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
