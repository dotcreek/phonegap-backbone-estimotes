module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('createDefaultTemplate', function() {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('You should run grunt serve');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build', 'open:server', 'connect:dist:keepalive'
            ]);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function(isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:test',
            'mocha',
        ];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        }

        /**
         * Already connected so not going to connect again, remove the
         * connect:test task
         */
        testTasks.splice(testTasks.indexOf('connect:test'), 1);
        return grunt.task.run(testTasks);
    });

    grunt.registerTask('phonegap', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        // 'uglify',
        'copy:dist',
        // 'rev',
        // 'usemin',
        'copy:phonegap',
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

};
