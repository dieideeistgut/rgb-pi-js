var gulp = require('gulp'),
    typescript = require('gulp-tsc'),
    gutil = require('gulp-util'),
    del = require('del');
    
//Watching files
gulp.task('watch', function() {
    gulp.watch(["!**tmp**", "src/**/*.ts", "src/**/*.js", "src/**/*.json"], gulp.series('compile'));
    gulp.watch(["!**tmp**", "src/pub/**/*"], gulp.series('copy-pub'));
    });
    

//Cleaning dist/
gulp.task('clean', function() {
    return del(["dist/*"], {force: true});
});

//Compiling typescript into dist/
gulp.task('compile', function() {
    return gulp.src("src/**/*.ts")
        .pipe(typescript({keepTree: false}))
        .pipe(gulp.dest("dist"));
});

//Compiling pub/ (Webinterface) into dist/
gulp.task('copy-pub', function() {
        gutil.log("Copying public files.");
   return gulp.src("src/pub/**/*").pipe(gulp.dest("dist/pub")); 
});

//Building the whole thing
gulp.task('build', gulp.parallel('clean', 'compile', 'copy-pub'));
    
//Default tasking. Currently only calling watch
gulp.task('default', gulp.series('build', 'watch'));
