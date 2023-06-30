'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cleanCSS = require('gulp-clean-css');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const srcPaths = {
	sass: ['./src/scss/**/*.scss'],
	scripts: ['./src/js/output.js'],
	componentScripts: ['./src/js/components/*.js'],
};

gulp.task('coreStyles', function () {
	return gulp
		.src('src/scss/output.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(autoprefixer())
		.pipe(rename('application.css.liquid'))
		.pipe(gulp.dest('assets/'));
});

gulp.task('sectionStyles', function () {
	return gulp
		.src('src/scss/sections/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(autoprefixer())
		.pipe(rename({ extname: '.css' }))
		.pipe(gulp.dest('assets/'));
});

gulp.task('snippetStyles', function () {
	return gulp
		.src('src/scss/snippets/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(autoprefixer())
		.pipe(rename({ extname: '.css' }))
		.pipe(gulp.dest('assets/'));
});

gulp.task('coreScripts', function () {
	return browserify({ entries: srcPaths.scripts, debug: true })
		.transform('babelify', { presets: ['@babel/preset-env'] })
		.bundle()
		.pipe(source('output.js'))
		.pipe(buffer())
		.pipe(
			uglify().on('error', function (e) {
				console.log(e);
				this.emit('end');
			})
		)
		.pipe(rename('application.js'))
		.pipe(gulp.dest('./assets'));
});

gulp.task('componentScripts', function () {
	return gulp
		.src('src/js/components/*.js')
		.pipe(buffer())
		.pipe(
			uglify().on('error', function (e) {
				console.log(e);
				this.emit('end');
			})
		)
		.pipe(rename({ extname: '.js' }))
		.pipe(gulp.dest('assets/'));
});

gulp.task('watch', function () {
	gulp.watch(srcPaths.sass, gulp.series('coreStyles'));
	gulp.watch(srcPaths.sass, gulp.series('sectionStyles'));
	gulp.watch(srcPaths.sass, gulp.series('snippetStyles'));
	gulp.watch('src/js/global/*.js', gulp.series('coreScripts'));
	gulp.watch('src/js/components/*.js', gulp.series('componentScripts'));
});

gulp.task('default', gulp.series('coreStyles', 'sectionStyles', 'snippetStyles', 'coreScripts', 'componentScripts'));
