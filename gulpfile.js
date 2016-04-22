var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('default', ['compile-debug']);


gulp.task('compile-debug', function() {
    return gulp.src("src/**/*.ts")
        .pipe(typescript())
        .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
    gulp.watch(["src/**/*.ts"], ['compile-debug']);
});

gulp.task('clean', function() {
    return del(["dist"]);
});