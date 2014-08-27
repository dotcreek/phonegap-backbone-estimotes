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
