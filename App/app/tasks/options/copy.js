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
                'styles/**.*',
                'fonts/**/*.*',
            ]
        }]
    }
};
