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

        console.log('To page', state);
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
    }
};

/**
 * Start application
 */
$(document).ready(function() {
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
    Backbone.history.start();
});

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
this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/pages/home.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( JST['app/scripts/templates/partials/_navigation.ejs']({nav: 'home'}) )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/templates/pages/settings.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( JST['app/scripts/templates/partials/_navigation.ejs']({
nav: 'settings'
}) )) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view">\n<li class="table-view-cell">\nItem 1\n<div class="toggle">\n<div class="toggle-handle"></div>\n</div>\n</li>\n<li class="table-view-cell">\nItem 2\n<div class="toggle active">\n<div class="toggle-handle"></div>\n</div>\n</li>\n<li class="table-view-cell">\nItem 3\n<div class="toggle">\n<div class="toggle-handle"></div>\n</div>\n</li>\n</ul>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/partials/_navigation.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header class="bar bar-tab">\n<a class="tab-item ' +
((__t = ( nav === 'home' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-home"></span>\n<span class="tab-label">Home</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'profile' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-person"></span>\n<span class="tab-label">Profile</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'favorites' ? 'active' : '' )) == null ? '' : __t) +
'" href="#">\n<span class="icon icon-star-filled"></span>\n<span class="tab-label">Favorites</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'rooms' ? 'active' : '' )) == null ? '' : __t) +
'" href="#rooms">\n<span class="icon icon-list"></span>\n<span class="tab-label">Rooms</span>\n</a>\n<a class="tab-item ' +
((__t = ( nav === 'settings' ? 'active' : '' )) == null ? '' : __t) +
'" href="#settings">\n<span class="icon icon-gear"></span>\n<span class="tab-label">Settings</span>\n</a>\n</header>';

}
return __p
};

this["JST"]["app/scripts/templates/rooms/index.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p +=
((__t = ( JST[ 'app/scripts/templates/partials/_navigation.ejs']({ nav: 'rooms' }) )) == null ? '' : __t) +
'<div class="content">\n<ul class="table-view">\n';
 collection.forEach(function(item){ ;
__p += '\n<li class="table-view-cell media">\n<a class="navigate-right" href=\'#rooms/' +
((__t = ( item.get("id"))) == null ? '' : __t) +
'\'>\n<div class="media-body">\n' +
((__t = (item.get( 'name') )) == null ? '' : __t) +
'\n<p> ' +
((__t = ( item.get('upcoming') )) == null ? '' : __t) +
' </p>\n</div>\n</a>\n</li>\n';
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
((__t = ( model.get('room').name )) == null ? '' : __t) +
'</h1>\n</header>\n<div class="content">\n<ul class="table-view">\n';
 model.get('contents').upcommingEvents.forEach(function(item){;
__p += '\n<li class="table-view-cell media">\n<a class="" href=\'#rooms/' +
((__t = ( item.get(""))) == null ? '' : __t) +
'\'>\n<div class="media-body">\n' +
((__t = (item.get( '') )) == null ? '' : __t) +
'\n<p> ' +
((__t = ( item.get('') )) == null ? '' : __t) +
' </p>\n</div>\n</a>\n</li>\n';
 }) ;
__p += '\n</ul>\n</div>';

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

        defaults: {}
    });
})();

(function() {
    'use strict';

    App.Views.Home = Backbone.View.extend({

        template: JST['app/scripts/templates/pages/home.ejs'],

        render: function() {
            this.$el.html(this.template());
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

(function () {
    'use strict';

    App.Views.Rooms = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/index.ejs'],

        render: function() {
            this.$el.html(this.template({collection : this.collection}));
            return this;
        }
    });
})();

(function () {
    'use strict';

    App.Collections.Room = Backbone.Collection.extend({

        model: App.Models.Room,

        url: App.config.api + 'rooms'

    });

})();

(function () {
    'use strict';

    App.Views.RoomsShow = Backbone.View.extend({

        template: JST['app/scripts/templates/rooms/show.ejs'],

        render: function () {
            this.$el.html(this.template({model:this.model}));
            return this;
        },

        events: {
            'click .btn-back': 'back'
        },

        back: function(){
            window.history.back();
            return false;
        }

    });

})();
