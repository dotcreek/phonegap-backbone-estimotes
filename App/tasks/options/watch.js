module.exports = {

    options: {
        nospawn: true,
        livereload: true
    },

    less: {
        files: ['<%= yeoman.app %>/styles/*.less'],
        tasks: ['less']
    },

    livereload: {
        options: {
            livereload: '<%= yeoman.LIVERELOAD_PORT %>'
        },

        files: [
            '<%= yeoman.app %>/*.html',
            '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
            '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
            '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.app %>/scripts/templates/**/*.{ejs,mustache,hbs}',
            'test/spec/**/*.js',
            'test/index.html'
        ]
    },

    jst: {

        files: [
            '<%= yeoman.app %>/scripts/templates/**/*.ejs'
        ],

        tasks: ['jst']
    },

    test: {
        files: ['<%= yeoman.app %>/scripts/**/*.js', 'test/**/*.js'],
        tasks: ['test:true']
    }
};
