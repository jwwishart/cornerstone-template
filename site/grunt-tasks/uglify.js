module.exports = {
    options: {
        banner: '/*! <%= grunt.template.today("dd-mmmm-yyyy") %> */\n\n'
    },
    dist: {
        files: {
            "dist/<%= pkg.name %>.min.js": ['<%= concat.dist.dest %>']
        }
    }
};