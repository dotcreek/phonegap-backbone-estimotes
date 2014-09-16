(function() {
    'use strict';

    App.Views.CellView = Backbone.View.extend({
        tagName: 'li',
        className: 'table-view-cell media navigate-right',
        initialize: function(opt) {
            this.template = JST[opt.template];
            this.listenTo(this.model, 'destroy', this.removeModel);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template({
                item: this.model
            }));
            return this.$el;
        },

        removeModel: function() {
            this.$el.remove();
        }
    });
})();
