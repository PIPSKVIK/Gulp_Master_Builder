`use strict`;

// Global
const gulp = require(`gulp`); // Сам сборщик.
const plumber = require(`gulp-plumber`); // Отслеживание ошибок.
const del = require(`del`); // Чистит перед отправкой.
const rename = require(`gulp-rename`); // Переименовывает файлы.
const htmlmin = require(`gulp-htmlmin`); // Минимизирует html файлы.
const fileinclude = require(`gulp-file-include`); // Для подключения флоков в html.
const cheerio = require(`gulp-cheerio`); // Удаление лишних атрибутов из svg.
const gulpIf = require(`gulp-if`); // Это условие по которому будет пихатся все в папку Production.
const size = require(`gulp-size`); // Показывает размеры файлов.
const sourcemaps = require(`gulp-sourcemaps`); // В devtools видно какой блок сейчас выделен.
const server = require(`browser-sync`).create(); // Автоматическая перезагрузка Браузера после сохранения файла в редакторе кода.

// SVG, PNG, JPG, WEBP
const imagemin = require(`gulp-imagemin`); // Минимизирует вес изображений.
const svgmin = require(`gulp-svgmin`); // Минимайзер SVG
const svgstore = require(`gulp-svgstore`); // Создает хранилище SVG
const webp = require(`gulp-webp`); // Для оптимизации работы с форматом webp.

// JS
const babel = require(`gulp-babel`); // Компилятор JavaScript позволяет совместить старые и новые версии ECMAScript.
const uglify = require(`gulp-uglify`); // Минимизирует какой-то вендор ???
const concat = require(`gulp-concat`); // Подключение блоков js в одном файле.

// CSS
const sass = require(`gulp-sass`); // Компилятор sass в css.
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`); // Автоматически проставляет префиксы к css свойствам.
const cssnano = require(`gulp-cssnano`); // Минимизатор css

const isProduction = process.env.NODE_ENV === `production`;

var path = {
  src: {
    html: [`src/**/*.html`, `!src/_blocks/**/*.html`],
    js: [`src/_blocks/**/*.js`, `!src/_blocks/**/jq-*.js`],
    jsJq: `src/_blocks/**/jq-*.js`,
    jsPlugins: `src/plugins/**/*`,
    css: `src/scss/main.scss`,
    img: `src/img/_blocks/**/*.{png,jpg,gif,webp}`,
    imgWebp: `src/img/_blocks/**/*.{webp}`,
    blocksvg: `src/img/_blocks/**/*.svg`,
    fonts: [`src/fonts/**/*.*`, `!src/fonts/**/*.scss`],
    favicon: `src/img/favicon/*`,
    svg: `src/img/svg/*.svg`,
    webmanifest: `src/manifest-*.json`
  },
  watch: {
    html: `src/**/*.html`,
    js: [`src/**/*.js`, `!src/webpack/**/*`],
    css: `src/**/*.scss`,
    fonts: `src/fonts/**/*.*`
  },
  build: {
    html: `build/`,
    js: `build/js/`,
    jsPlugins: `build/plugins/`,
    css: `build/css/`,
    img: `build/img/`,
    fonts: `build/fonts/`,
    favicon: `build/img/favicon/`,
    svgSprite: `build/img/svg`,
    webmanifest: `build/`
  },
  clean: [`./build`],
};

gulp.task("clean", () => {
  return del(path.clean);
});
//-----------------------------------

//Генерации изображений в формате webp
gulp.task(`webp`, () => {
  return gulp.src(`src/img/_blocks/**/*.{png,jpg}`)
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest(`src/img/_blocks/`));
});
//-----------------------------------

// Таск для склеивания SVG-спраита
gulp.task(`symbols`, () => {
  return gulp.src(path.src.svg)
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(cheerio({
      run: function($) {
        $(`svg`).attr(`style`, `display:none`);
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename(`symbols.svg`))
    .pipe(gulp.dest(path.build.svgSprite))
    .pipe(server.stream());
});
//------------------------------------

//Копируем шрифты
gulp.task(`fonts`, () => {
  return gulp.src(path.src.fonts)
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(server.stream());
});
//-------------------------------------

//Копируем svg, которые размещены в папке img/_blocks
gulp.task(`blocksvg`, () => {
  return gulp.src(path.src.blocksvg)
    .pipe(gulpIf(isProduction, svgmin()))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.img))
    .pipe(server.stream());
});
//-------------------------------------

//Копируем фавиконы
gulp.task(`copyfavicon`, () => {
  return gulp.src(path.src.favicon)
    .pipe(gulp.dest(path.build.favicon))
    .pipe(server.stream());
});
//-------------------------------------

//Копируем webmanifest
gulp.task(`copywebmanifest`, () => {
  return gulp.src(path.src.webmanifest)
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.webmanifest))
    .pipe(server.stream());
});
//-------------------------------------

//Копируем js для сторонних плагинов
gulp.task(`pluginsJS`, () => {
  return gulp.src(path.src.jsPlugins)
    .pipe(gulp.dest(path.build.jsPlugins))
    .pipe(server.stream());
});
//------------------------------------

//Инклуд html
gulp.task(`fileinclude`, () => {
  return gulp.src(path.src.html)
    .pipe(fileinclude({
      prefix: `@@`,
      basepath: `@file`
    }))
    .pipe(gulpIf(isProduction, htmlmin({ collapseWhitespace: true })))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.html))
    .pipe(server.stream());
});

//---------------------------------------

// CSS
gulp.task(`style`, () => {
  return gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulpIf(isProduction, cssnano({ discardComments: { removeAll: true } })))
    .pipe(sourcemaps.write())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.css))
    .pipe(server.stream());
});
//------------------------------------

// Таск для сбора JS в один файл
gulp.task(`scripts`, () => {
  return gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [`@babel/env`]
    }))
    .pipe(concat(`script.js`))
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(sourcemaps.write())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.js))
    .pipe(server.stream());
});
//--------------------------------------

// Таск для сбора JQuery в один файл
gulp.task(`scriptsJq`, () => {
  return gulp.src(path.src.jsJq)
    .pipe(babel({
      presets: [`@babel/env`]
    }))
    .pipe(concat(`jq-script.js`))
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.js))
    .pipe(server.stream());
});
//--------------------------------------

//Таск для работы с изображениями
gulp.task(`image`, () => {
  return gulp.src(path.src.img)
    .pipe(gulpIf(isProduction, imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ])))
    .pipe(gulp.dest(path.build.img))
    .pipe(server.stream());
});
//---------------------------------------

// Сервер
gulp.task(`server`, () => {
  server.init({
    server: `build`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(path.src.img, gulp.parallel(`image`));
  gulp.watch(path.watch.html, gulp.parallel(`fileinclude`));
  gulp.watch(path.watch.js, gulp.parallel(`scripts`, `scriptsJq`));
  gulp.watch(path.src.jsPlugins, gulp.parallel(`pluginsJS`));
  gulp.watch(path.watch.css, gulp.parallel(`style`));
  gulp.watch(path.watch.fonts, gulp.parallel(`fonts`));
  gulp.watch(path.src.favicon, gulp.parallel(`copyfavicon`));
  gulp.watch(path.src.webmanifest, gulp.parallel(`copywebmanifest`));
  gulp.watch(path.src.blocksvg, gulp.parallel(`blocksvg`));
});
//----------------------------------------

// Build
gulp.task(`build`, (done) => {
  gulp.series(
    `clean`,
    `symbols`,
    gulp.parallel(
      `image`,
      `fileinclude`,
      `style`,
      `scripts`,
      `scriptsJq`,
      `fonts`,
      `pluginsJS`,
      `copyfavicon`,
      `blocksvg`,
      `copywebmanifest`
    ),
    `server`
  )();

  done();
});
