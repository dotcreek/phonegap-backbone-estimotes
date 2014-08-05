'use strict';
var LIVERELOAD_PORT = 35728,
    SERVER_PORT = 9000,
    lrSnippet, mountFolder, loadConfig;

lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});

mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

loadConfig = function(path) {
    /**
     * Require you install glob globally. npm install -g glob
     * @type {[type]}
     */
    var glob = require('glob'),
        object = {},
        key;

    glob.sync('*', {
        cwd: path
    }).forEach(function(option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
    });
    return object;
};

module.exports = function(grunt) {
    // show elapsed time at the end
    // require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var config = {
        yeoman: {
            app: 'app',
            dist: 'dist',
            phonegap: '../www/',
            SERVER_PORT: SERVER_PORT,
            LIVERELOAD_PORT: LIVERELOAD_PORT
        }
    };

    grunt.util._.extend(config, loadConfig('./tasks/options/'));

    config.connect = {
        options: {
            port: grunt.option('port') || SERVER_PORT,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },

        livereload: {
            options: {
                middleware: function(connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, config.yeoman.app)
                    ];
                }
            }
        },

        test: {
            options: {
                port: 9001,
                middleware: function(connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, 'test'),
                        mountFolder(connect, config.yeoman.app)
                    ];
                }
            }
        },

        dist: {
            options: {
                middleware: function(connect) {
                    return [
                        mountFolder(connect, config.yeoman.dist)
                    ];

                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadTasks('tasks');
};
