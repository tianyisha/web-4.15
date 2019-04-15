const gulp = require('gulp');
const mincss = require('gulp-clean-css');
const minjs = require('gulp-uglify');
const minimg = require('gulp-imagemin');
const server = require('gulp-webserver');
const bsass = require('gulp-sass');
const fs = require('fs');
const path = require('path');
const url = require('url')
gulp.task('js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('dist/js'))
})
gulp.task('css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
})
gulp.task('img', () => {
    return gulp.src('./src/images/*.jpg')
        .pipe(minimg())
        .pipe(gulp.dest('dist/image'))
})
gulp.task('sass', () => {
        return gulp.src('./src/scss/*.scss')
            .pipe(bsass())

    })
    //watch 监听
gulp.task('watch', () => {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));

})
gulp.task('webserver', () => {
        return gulp.src('.')
            .pipe(server({
                port: 8080,
                open: true,
                livereload: true,
                middleware: function(req, res) {
                    //var pathname = url.parse(req.url).pathname;
                    // if (pathname == '/api') {
                    //     res.end(JSON.stringify([1, 2, 3, 4]))
                    // } else {
                    //     fs.readFileSync(path.join(__dirname, 'src', pathname))
                    // }
                    if (req.url == '/') {
                        fs.readFileSync(path.join(__dirname, 'src', pathname))
                    }
                }
            }))
    })
    //开发环境
gulp.task('dev', gulp.series('sass', 'webserver', 'watch'))
    //打包环境
gulp.task('build', gulp.parallel('js', 'css', 'img'))