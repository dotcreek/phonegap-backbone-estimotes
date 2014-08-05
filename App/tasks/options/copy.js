module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
                'assets/**/*',
                'images/{,*/}*.{webp,gif, jpg, png}',
                'styles/fonts/{,*/}*.*',
                'fonts/{,*/}*.*',
            ]
        }]
    },

    phonegap: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.dist %>',
            dest: '<%= yeoman.phonegap %>',
            src: [
                'assets/**/*',
                'scripts/**/*.js',
                'images/**/*',
                'styles/**.css',
                'fonts/**.*',
            ]
        }]
    }
};
