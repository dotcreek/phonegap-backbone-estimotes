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
                var source = src.replace(/<%t /g, '<%= App.polyglot.t');
                return source.replace(/(^\s+|\s+$)/gm, '');
            }
        }
    }
};
