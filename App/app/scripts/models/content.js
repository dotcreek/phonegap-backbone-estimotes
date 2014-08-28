(function () {
    'use strict';

    App.Models.Content = Backbone.Model.extend({

        urlRoot: App.config.api + 'contents',

        defaults: {}
    });

})();
