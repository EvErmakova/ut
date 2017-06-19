module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true,
                    data: function(dest, src) {
                        return { "img": "/img/", "js": "/js/", "css": "../css/"}
                    }
                },
                files: [ {
                    expand: true,
                    flatten: true,
                    src: "html/pages/*.jade",
                    dest: "html/",
                    ext: ".html"
                } ]
            }
        },
        less: {
            dev: {
                options: {
                    sourceMapFileInline: true
                },
                files: {
                    '../css/style.css': '../css/style.less'
                }
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    sourceMapFileInline: true,
                    optimization: 2
                },
                files: {
                    '../css/style.css': '../css/style.less'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/common.js': ['js/blocks/*.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: '.'
                }
            }
        },
        watch: {
            css: {
                files: ['../css/*/*.less','../css/*.less'],
                tasks: 'less:production'
            },
            pages : {
                files: ['html/pages/*.jade' , 'html/partials/**/*.jade', 'html/layouts/*.jade', 'html/partials/**/*.html'],
                tasks: ['jade']
            }
        },
    });

    grunt.registerTask('default', ['jade:compile','less:production','uglify:my_target']);
    grunt.registerTask('live', ['watch']);
};