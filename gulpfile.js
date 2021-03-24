const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const mode = require("gulp-mode")();


// SCSS to CSS
gulp.task("process-sass", () => {
  return gulp
    .src("assets/scss/index.scss")
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["> 1%"],
      })
    )
    .pipe(cssnano())
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest("assets/css"));
});

// Call Task
gulp.task("default", () => {
  gulp.watch(
    ["assets/scss/*.scss", "assets/scss/*/*.scss"],
    { ignoreInitial: false },
    gulp.series("process-sass")
  );
});
