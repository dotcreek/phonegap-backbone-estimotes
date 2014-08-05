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
    }
};
