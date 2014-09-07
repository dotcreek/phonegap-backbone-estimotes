'use strict';

var Scope = {};

Scope.viewDefaults = function(viewName) {
    describe('defaults', function() {
        beforeEach(function() {
            this.View = new App.Views[viewName]();
        });

        it('should have a template', function() {
            expect(this.View.template).to.be.a('function');
        });

        it('should have a render', function() {
            expect(this.View.render).to.be.a('function');
        });
    });
};

Scope.collectionDefaults = function(collectionName) {
    describe('defaults', function() {
        beforeEach(function() {
            this.Collection = new App.Collections[collectionName]();
        });

        it('should have a url', function() {
            var url = App.config.api + collectionName.toLowerCase();
            expect(this.Collection.url).to.be.equal(url);
        });

        it('should have a model', function() {
            expect(this.Collection.model).to.be.a('function');
        });
    });
};

Scope.modelDefaults = function(modelName) {
    describe('defaults', function() {
        beforeEach(function() {
            this.Model = new App.Models[modelName]();
        });

        it('should have a url', function() {
            expect(this.Model.urlRoot).not.to.be.equal('');
        });

        it('should have a defaults object', function() {
            expect(this.Model.defaults).to.be.an('object');
        });
    });
};
