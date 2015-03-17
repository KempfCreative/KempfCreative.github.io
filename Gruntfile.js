'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            compass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass']
            },
            livereload: {
                files: ['*.html', 'css/*.css', 'javascript/**/*.js', 'images/**/*.{png,jpg,jpeg,webp}', 'articles/**/*.json'],
                tasks: ['concat:dist']
            }
        },
        concat: {
            options: {
                stripBanners: false,
                separator: ';',
                banner:''
            },
            dist: {
                files: {
                    'javascript/build/twd.js': [
                        'javascript/vendor/jquery-1.10.2.min.js',
                        'javascript/app.js',
                        'javascript/articleModel.js',
                        'javascript/articleController.js',
                        'javascript/articleView.js'
                    ]
                }
            }
        },
        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'css',
                imagesDir: 'images',
                javascriptsDir: 'javascript',
                fontsDir: 'fonts',
                relativeAssets: true
            },
            debug: {
                options: {
                    debugInfo: false
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                protocol: 'http',
                hostname: 'localhost',
                base: ''
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                        mountFolder(connect, '')];
                    }
                }
            }
        },
        open: {
            local: {
                path: 'http:localhost:<%= connect.options.port %>'
            }
        }
    });

    grunt.registerTask('default', ['concat:dist', 'connect:livereload', 'open:local', 'watch']);
};