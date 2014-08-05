module.exports = {

    models: {
        options: {
            run: true,
            log: true,
            reporter: 'Spec',
            timeout: 10000,
            urls: ['http://localhost:<%= connect.test.options.port %>/models.html']
        }
    },

    collections: {
        options: {
            run: true,
            log: true,
            reporter: 'Spec',
            timeout: 10000,
            urls: ['http://localhost:<%= connect.test.options.port %>/collections.html']
        }
    },

    'integration.collections': {
        options: {
            run: true,
            log: true,
            reporter: 'Spec',
            timeout: 10000,
            urls: ['http://localhost:<%= connect.test.options.port %>/integration_collections.html']
        }
    },

    'integration.models': {
        options: {
            run: true,
            log: true,
            reporter: 'Spec',
            timeout: 10000,
            urls: ['http://localhost:<%= connect.test.options.port %>/integration_models.html']
        }
    },

    views: {
        options: {
            run: true,
            log: true,
            reporter: 'Min',
            timeout: 10000,
            urls: ['http://localhost:<%= connect.test.options.port %>/views.html']
        }
    },

    all: {
        options: {
            run: true,
            log: true,
            reporter: 'Spec',
            // reporter: 'Dot',
            // reporter: 'mocha-unfunk-reporter',
            // reporter: 'Nyan',
            // reporter: 'Landing',
            // reporter: 'Min',
            // reporter: 'mocha-teamcity-reporter',
            // reporter: 'mocha-bamboo-reporter',
            // reporter: 'mocha-koans-reporter',
            // reporter: 'mocha-fivemat-reporter',
            // reporter: 'mocha-term-cov-reporter',
            // reporter: 'List',
            // reporter: 'Progress',
            // run: false,
            timeout: 10000,
            // src: ['http://localhost:<%= connect.test.options.port %>/index.html']
            urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
    }
};
