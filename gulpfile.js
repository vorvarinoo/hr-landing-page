const {
  src,
  dest,
  series,
  watch
} = require( 'gulp' );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( 'autoprefixer' );
const babel = require( 'gulp-babel' );
const del = require( 'del' );
const browserSync = require( 'browser-sync' ).create();
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const svgSprite = require( 'gulp-svg-sprite' );
const fileInclude = require( 'gulp-file-include' );
const sourcemaps = require( 'gulp-sourcemaps' );
const notify = require( 'gulp-notify' );
const imagemin = require( 'gulp-imagemin' );
const concat = require( 'gulp-concat' );
const csscomb = require( "gulp-csscomb" );
const cleanCSS = require( 'gulp-clean-css' );

const clean = () => {
  return del( [ 'build/*' ] )
}

const svgSprites = () => {
  return src( './src/img/sprite/**.svg' )
    .pipe( svgSprite( {
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    } ) )
    .pipe( dest( './build/img' ) );
}

const styles = () => {
  return src( './src/scss/**/*.scss' )
    .pipe( sourcemaps.init() )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( dest( './build/css/' ) )
    .pipe( csscomb() )
    .pipe( dest( './build/css/' ) )
    .pipe( browserSync.stream() );
};

const stylesProd = () => {
  return src( './src/scss/**/*.scss' )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( dest( './build/css/' ) )
    .pipe( csscomb() )
    .pipe( dest( './build/css/' ) )
};

const minifyLibs = () => {
  return src( './build/css/libs.css' )
    .pipe( cleanCSS( {
      level: 2
    } ) )
    .pipe( dest( './build/css/' ) )
};

const scripts = () => {
  src( './src/js/libs/**.js' )
    .pipe( concat( 'libs.js' ) )
    .pipe( dest( './build/js/' ) )
  return src(
      [ './src/js/global.js', './src/js/components/**.js', './src/js/main.js' ] )
    .pipe( sourcemaps.init() )
    .pipe( concat( 'main.js' ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( dest( './build/js' ) )
    .pipe( browserSync.stream() );
}

const scriptsProd = () => {
  src( './src/js/libs/**.js' )
    .pipe( concat( 'libs.js' ) )
    .pipe( dest( './build/js/' ) )
  return src(
      [ './src/js/global.js', './src/js/components/**.js', './src/js/main.js' ] )

    .pipe( concat( 'main.js' ) )
    .pipe( babel( {
      presets: [ '@babel/env' ]
    } ) )

    .pipe( dest( './build/js' ) )
    .pipe( browserSync.stream() );
}

const resources = () => {
  return src( './src/resources/**' )
    .pipe( dest( './build' ) )
}

const images = () => {
  return src( [
      './src/img/**.jpg',
      './src/img/**.png',
      './src/img/**.jpeg',
      './src/img/**.webp',
      './src/img/svg-folders/**/*.svg',
      './src/img/*.svg',
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/**/*.jpeg',
      './src/img/**/*.webp'
    ] )
    .pipe( dest( './build/img' ) )
};

const imagesProd = () => {
  return src( [
      './src/img/**.jpg',
      './src/img/**.png',
      './src/img/**.jpeg',
      './src/img/**.webp',
      './src/img/svg-folders/**/*.svg',
      './src/img/*.svg',
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/**/*.jpeg',
      './src/img/**/*.webp'
    ] )
    .pipe( imagemin( [
      imagemin.optipng( {
        optimizationLevel: 3
      } ),
      imagemin.mozjpeg( {
        progressive: true
      } ),
      imagemin.svgo()
    ] ) )
    .pipe( dest( './build/img' ) )
};

const htmlInclude = () => {
  return src( [ './src/*.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( dest( './build' ) )
    .pipe( browserSync.stream() );
}

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: "./build"
    },
    notify: false,
    ui: false,
  } );

  watch( './src/scss/**/*.scss', styles );
  watch( './src/js/**/*.js', scripts );
  watch( './src/blocks/**/*.html', htmlInclude );
  watch( './src/*.html', htmlInclude );
  watch( './src/resources/**', resources );
  watch( './src/img/*.{jpg,jpeg,png,svg,webp}', images );
  watch( './src/img/**/*.{jpg,jpeg,png,webp}', images );
  watch( './src/img/svg-folders/**/*.svg', images );
  watch( './src/img/sprite/**.svg', svgSprites );
}

exports.default = series( clean, htmlInclude, scripts, styles, resources, images, svgSprites, watchFiles );

exports.build = series( clean, htmlInclude, scriptsProd, stylesProd, minifyLibs, resources, imagesProd, svgSprites );

exports.server = series( watchFiles );

exports.clean = series( clean );
