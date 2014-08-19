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
                'concat:unit',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'concat:unit',
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

    /**
     * Prepare content to be used with phonegap on
     *     phonegap build/run android/ios
     * @param  {String} target either android or ios
     */
    grunt.registerTask('phonegap', function(target) {

        if (target) {
            if (target !== 'android' && target !== 'ios') {
                throw new Error('target should be android or ios.');
            }
        }

        var tasks = [
            'clean:dist',
            'jshint',
            'createDefaultTemplate',
            'jst',
            'useminPrepare',
            'imagemin',
            'htmlmin',
            'concat',
            'cssmin:' + (target ? target : 'android'),
            'copy:dist',
            'copy:phonegap'
        ];
        grunt.task.run(tasks);
        return;
    });

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

    grunt.registerTask('unit', function(target) {
        var tasks = ['clean:server'];

        target = target ? target : '';
        var concat = grunt.config.get('concat') || {};
        if (target === 'models' || target === 'collections') {
            target = target + '/**/';
        }

        if (!target || target === 'views') {
            tasks.push('createDefaultTemplate');
            tasks.push('jst');
            if (!target) {}
            target = target + '/**/';
        }

        concat.unit.src = 'test/unit/' + target + '*.js';
        grunt.config.set('concat', concat);

        ['concat:unit', 'connect:test', 'mocha:all'].forEach(function(item) {
            tasks.push(item);
        });

        return grunt.task.run(tasks);
    });
};
