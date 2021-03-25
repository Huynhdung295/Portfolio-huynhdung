const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const mode = require("gulp-mode")();
// const pug = require("gulp-pug-3");
const sourcemaps = require('gulp-sourcemaps');

// SCSS to CSS
gulp.task("process-sass", () => {
  return gulp
    .src("src/assets/scss/index.scss")
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["> 1%"],
      })
    )
    .pipe(cssnano())
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest("src/assets/css"));
});


// Pug to HTML
// gulp.task("pug", () => {
//   return gulp
//     .src("src/*.pug")
//     .pipe(
//       pug({
//         doctype: "html",
//         pretty: false,
//       })
//     )
//     .pipe(gulp.dest("src/assets/"));
// });

// Call Task
gulp.task("default", () => {
  gulp.watch(
    ["src/assets/scss/*.scss", "src/assets/scss/*/*.scss"],
    { ignoreInitial: false },
    gulp.series("process-sass")
  );


  // gulp.watch(["src/*.pug"], { ignoreInitial: false }, gulp.series("pug"));
});
