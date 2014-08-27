module.exports = {
    dist: {
        options: {
            keepSpecialComments: 0,
            // report: 'gzip',
        },

        files: {
            '<%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
            ]
        }
    },

    android: {
        options: {
            keepSpecialComments: 0,
        },

        files: {
            '<%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/styles/{,*/}*.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-android.css'
            ]
        }
    },

    ios: {
        options: {
            keepSpecialComments: 0,
        },

        files: {
            '<%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-ios.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
            ]
        }
    }
};
