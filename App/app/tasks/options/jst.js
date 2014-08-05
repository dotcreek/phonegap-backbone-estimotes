module.exports = {
    compile: {
        files: {
            '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/**/*.ejs']
        },
        options: {
            /**
             * Remove whitespaces frm the beginning and end of each line
             */
            processContent: function(src) {
                return src.replace(/(^\s+|\s+$)/gm, '');
            }
        }
    }
};
