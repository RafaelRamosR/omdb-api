/* eslint-disable */
//HTML
import htmlmin from 'gulp-htmlmin';

//CSS
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
//Clean CSS
import clean from 'gulp-purgecss';

//JavaScript
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

//Common
import concat from 'gulp-concat';
//Caché bust
import cacheBust from 'gulp-cache-bust';
//Optimización imágenes
import imagemin from 'gulp-imagemin';
//Browser sync
import { init as server, stream, reload } from 'browser-sync';
//Plumber
import plumber from 'gulp-plumber';

//Variables/constantes
const cssPlugins = [cssnano(), autoprefixer()];

gulp.task('html-min', () => {
  return gulp
    .src('./src/*.html')
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(
      cacheBust({
        type: 'timestamp'
      })
    )
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', () => {
  return gulp
    .src('./src/assets/css/*.css')
    .pipe(plumber())
    .pipe(concat('styles-min.css'))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./public/css'))
    .pipe(stream());
});

gulp.task('babel', () => {
  return gulp
    .src('./src/**/*.js')
    .pipe(plumber())
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('clean', () => {
  return gulp
    .src('./public/css/styles-min.css')
    .pipe(plumber())
    .pipe(
      clean({
        content: ['./public/*.html']
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('imgmin', () => {
  return gulp
    .src('./src/assets/img/*.png')
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 30, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 })
      ])
    )
    .pipe(gulp.dest('./public/images'));
});

gulp.task('default', () => {
  server({
    server: './public'
  });
  gulp.watch('./src/*.html', gulp.series('html-min')).on('change', reload)
  gulp.watch('./src/assets/css/*.css', gulp.series('styles'))
  gulp.watch('./src/**/*.js', gulp.series('babel')).on('change', reload);
});
