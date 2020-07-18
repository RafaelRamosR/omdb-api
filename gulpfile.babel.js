/* eslint-disable */
import gulp from 'gulp';
import { init as server } from 'browser-sync';

gulp.task('default', () => {
  server({
    server: {
      baseDir: "./src"
    }
  });
});
