var gulp = require('gulp'),
    typescript = require('gulp-tsc'),
    gutil = require('gulp-util');

gulp.task('default', ['watch']);

gulp.task('install', ['build', 'run']);
gulp.task('build', ['compile', 'copy-pub']);


gulp.task('compile', function() {
    return gulp.src("src/**/*.ts")
        .pipe(typescript())
        .pipe(gulp.dest("dist"));
});

gulp.task('copy-pub', function() {
        gutil.log("Copying public files.");
   return gulp.src("src/pub/**/*").pipe(gulp.dest("dist/pub")); 
});


gulp.task('watch', function() {
    return gulp.watch(["src/**/*.ts", "src/pub/**/*"], ['compile', 'copy-pub']);
});

gulp.task('clean', function() {
    return del(["dist"]);
});