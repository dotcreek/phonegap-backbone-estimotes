module.exports = {
    main: {
        options: {
            model: 'gzip',
        },
        expand: true,
        cwd: 'dist/',
        src: ['**/*'],
        dest: 'dist/'
    }
};
