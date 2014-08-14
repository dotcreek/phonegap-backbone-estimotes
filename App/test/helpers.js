window.Scope = {};

Scope.viewDefaults = function (viewName) {
    describe('defaults', function () {
        beforeEach(function () {
            this.View = new App.Views[viewName]();
        });

        it('should have a template', function () {
            expect(this.View.template).to.be.a('function');
        });

        it('should have a render', function () {
            expect(this.View.render).to.be.a('function');
        });
    });

};
