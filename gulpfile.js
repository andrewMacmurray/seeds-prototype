var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('styles', function() {
   gulp.src('scss/**/*.scss')
       .pipe(concat('style.scss'))
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./css/'))
});

gulp.task('default', function() {
   gulp.watch('scss**/*.scss', ['styles'])
})
