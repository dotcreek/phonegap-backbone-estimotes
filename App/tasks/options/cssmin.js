module.exports = {
    dist: {
        options: {
            keepSpecialComments: 0,
            // report: 'gzip',
        },

        files: {
            '<%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/bower_components/fontawesome/css/font-awesome.css',
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
                '<%= yeoman.app %>/bower_components/fontawesome/css/font-awesome.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-android.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
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
                '<%= yeoman.app %>/bower_components/fontawesome/css/font-awesome.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-ios.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
            ]
        }
    },

    webView: {
        options: {
            keepSpecialComments: 0,
        },

        files: {
            '<%= yeoman.dist %>/styles/android.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/bower_components/fontawesome/css/font-awesome.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-android.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
            ],
            '<%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/{,*/}*.css',
                '<%= yeoman.app %>/bower_components/fontawesome/css/font-awesome.css',
                '<%= yeoman.app %>/scripts/vendor/ratchet-theme-ios.css',
                '<%= yeoman.app %>/styles/{,*/}*.css'
            ]
        }
    },
};
