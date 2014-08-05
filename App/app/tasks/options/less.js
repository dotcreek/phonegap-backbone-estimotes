module.exports = {
    development: {
        files: {
            '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less'
        }
    },

    production: {
        options: {
            cleancss: true,
            compress: true,
            sourceMap: true,
            // modifyVars: {
            //     imgPath: ''http://mycdn.com/path/to/images'',
            //     bgColor: 'red'
            // }
        },

        files: {
            '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less'
        }
    }
};
