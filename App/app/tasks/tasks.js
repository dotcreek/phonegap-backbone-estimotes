module.exports = function(grunt) {

    'use strict';
    grunt.registerTask('createDefaultTemplate', function() {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('customTests', function(target) {
        var testTasks = [
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:test',
        ];
        testTasks.push('mocha:' + target || 'mocha:all');
        return grunt.task.run(testTasks);
    });

    grunt.registerTask('integration', function(target) {
        var testTasks = [
            // 'clean:server',
            // 'jst',
            'connect:test',
        ];
        testTasks.push('mocha:integration.' + target || 'mocha:all');
        return grunt.task.run(testTasks);
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'less:development',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'less:development',
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
            'mocha:all',
        ];
        var opt = grunt.option('namespace') || 'index';
        grunt.config.data.mocha.all.options.urls = ['http://localhost:<%= connect.test.options.port %>/' + opt + '.html'];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        }
        // already connected so not going to connect again, remove the connect:test task
        testTasks.splice(testTasks.indexOf('connect:test'), 1);
        return grunt.task.run(testTasks);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'less:production',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

};
