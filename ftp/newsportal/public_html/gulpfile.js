var gulp = require('gulp'),
	concat = require('gulp-concat'),
    // uglify = require('gulp-uglify'),
    source = require('./source.js').returnSource,
    watch = require('gulp-watch');

gulp.task('js', function () { 
    return gulp.src(source()) 
    .pipe(concat('bundle.min.js')) 
    // .pipe(uglify()) 
    .pipe(gulp.dest('./public/prodaction/')); 
});

gulp.task('watch', function() {
    gulp.watch("./public/js/*.js", ['js']);
    gulp.watch("./public/js/helper.js", ['js']);
    gulp.watch("./public/js/app.js", ['js']);
    gulp.watch("./public/js/slider.js", ['js']);
    gulp.watch("./public/js/weather.js", ['js']);
    gulp.watch("./public/js/currency.js", ['js']);    
    gulp.watch("./public/js/_components/*.js", ['js']);
});