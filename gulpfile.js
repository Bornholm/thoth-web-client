var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var merge = require('merge-stream');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var replace = require('gulp-replace');

gulp.task('build', ['clean'], function() {

  var assets = useref.assets();

  var base = gulp.src('src/index.html')
    .pipe(replace(
      '<!-- {{templateCache}} -->',
      '<script type="text/javascript" src="scripts/templates.js"></script>'
    ))
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));

  var img = gulp.src('src/img/**')
    .pipe(gulp.dest('dist/img'));

  var templates = gulp.src('src/templates/**')
    .pipe(templateCache({
      root: 'templates/',
      module: 'Thoth'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));

  var i10n = gulp.src('src/i10n/**')
    .pipe(gulp.dest('dist/i10n'));

  var config = gulp.src('src/config.js')
    .pipe(gulp.dest('dist'));

  var fonts = gulp.src('src/bower_components/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('dist/fonts'));

  return merge(base, templates, img, fonts);

});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('default', ['build']);