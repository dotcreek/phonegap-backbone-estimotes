/**
 * @class Room
 * @constructor
 * @name App.Model.Room
 * @property {String} urlRoot API end point for this model
 * @property {Object} defaults Default properties for this model
 */
(function() {
    'use strict';

    App.Models.Room = Backbone.Model.extend({

        urlRoot: App.config.api + 'rooms',

        defaults: {},

        /**
         * @name Room#parse
         * @memberOf Room
         * @method parse
         * @description Set properties and modify JSON response from api
         * @param  {Object} data
         */
        parse: function(data) {
            /**
             * Set a property currentEvent to a model
             * @type {Object}
             */
            this.currentEvent = data.currentEvent;

            /**
             * If currentEvent is empty, set it to false, will help on template
             * validations
             */
            if (_.isEmpty(data.currentEvent)) {
                this.currentEvent = false;
            }

            /**
             * Set a property upcoming
             * @type {Object}
             */
            this.upcoming = data.upcoming || [];

            if (!data.upcoming.length) {
                return data;
            }

            data.upcoming = data.upcoming.sort(function(a, b) {
                /**
                 * Convert string date value to date and do the substraction
                 */
                return new Date(a.startAt) - new Date(b.startAt);
            });

            /**
             * Set property upcomingFirst
             * @type {Object}
             */
            this.upcomingFirst = data.upcoming[0] || false;

            /**
             * Return an object based on API response after set all properties
             * to current model
             */
            return data;
        }
    });
})();
