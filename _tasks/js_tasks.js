// Gulp.js configuration
const
  // modules
  gulp            = require('gulp'),
  plugin          = require('../_inc/plugin'),
  config          = require('../_inc/config'),
  paths           = require('../_inc/paths')
;

// site js processing
gulp.task('site:js', function() {
  let jsbuild = gulp.src(paths.js.siteRootFiles)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.deporder())
    .pipe(plugin.babel())
    .pipe(plugin.concat('main.min.js'));

    config.set(jsbuild); // run replacement settings from config file

  // minify production code
  if (process.env.NODE_ENV == 'Staging' || process.env.NODE_ENV == 'Production') {
    jsbuild = jsbuild
      //.pipe(plugin.stripdebug())
      .pipe(plugin.uglify());
  }
  jsbuild = jsbuild.pipe(plugin.sourcemaps.write(''));

  return jsbuild.pipe(gulp.dest(paths.js.siteDest));
});

// copying js files to build forder
gulp.task('site:js-copy', function() {
  return gulp.src([paths.js.siteFiles, '!' + paths.js.regFolder + 'amersc-registration.js'])
    .pipe(plugin.newer(paths.js.siteDest))
    .pipe(gulp.dest(paths.js.siteDest));
});

// js processing
gulp.task('js', ['site:js', 'site:js-copy']);