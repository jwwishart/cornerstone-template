
function config (name) {
    return require('./grunt-tasks/' + name + '.js');
}


module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: config('concat'),
        jshint: config('jshint'),
        emberTemplates: config('emberTemplates'),
        uglify: config("uglify"),
        watch: {
            files: ['templates/**/*.hbs', 'app/**/*.js'],
            tasks: ['jshint', 'emberTemplates', 'concat']
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ember-templates');

    // Tasks
    grunt.registerTask('dist', ['jshint', 'concat', 'emberTemplates', 'uglify']);
    grunt.registerTask('default', ['watch']);

};