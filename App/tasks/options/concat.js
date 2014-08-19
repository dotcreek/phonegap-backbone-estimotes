module.exports = {

    soptions: {
        separator: ';',
    },

    unit: {
        src: ['test/unit/**/*.js'],
        dest: '.tmp/scripts/test.js',
    },

    integration: {
        src: ['test/integration/**/*.js'],
        dest: '.tmp/scripts/test.js',
    },

    functional: {
        src: ['test/functional/**/*.js'],
        dest: '.tmp/scripts/test.js',
    },
};
