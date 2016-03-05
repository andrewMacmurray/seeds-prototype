const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const sass = require('gulp-sass');

gulp.task('styles', () => {
	return gulp.src('scss/**/*.scss')
		.pipe(concat('style.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('scripts', () => {
	return gulp.src('src/**/*.js')
      .pipe(concat('app.js'))
      .pipe(browserify())
      .pipe(gulp.dest('./build/'));
});

gulp.task('default', () => {
	gulp.watch('scss**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['scripts']);
});
