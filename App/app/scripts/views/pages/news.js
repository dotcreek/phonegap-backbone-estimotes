(function() {
    'use strict';

    App.Views.News = App.Views.Main.extend({

        template: JST['app/scripts/templates/pages/news.ejs'],

        addOne: function(model) {
            var template  = App.utils.getTemplate('news/new'),
                newsView = new App.Views.CellView({model: model, template: template});
            this.listSelector.append(newsView.render());
        }

    });

})();
