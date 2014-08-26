module.exports = {
    es: {
        options: {
            namespace: 'languages.ES',
            includePath: false,
            processName: function(filename) {
                return filename.toLowerCase();
            }
        },
        src: ['<%= yeoman.app %>/i18n/es/' + '**/*.json'],
        dest: '<%= yeoman.app %>/i18n/es.js'
    },

    en: {
        options: {
            namespace: 'languages.EN',
            includePath: false,
            processName: function(filename) {
                return filename.toLowerCase();
            }
        },
        src: ['<%= yeoman.app %>/i18n/en/' + '**/*.json'],
        dest: '<%= yeoman.app %>/i18n/en.js'
    }
}
