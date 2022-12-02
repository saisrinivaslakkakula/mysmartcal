
const { src, dest, series, parallel } = require('gulp');
//const del = require('del');
const log = require('fancy-log');
const { exec } = require("child_process");

const paths = {
    react_src: 'src/main/frontend/build/**/*',
    react_dist: 'src/main/resources/static/'
};

function clean()  {
    log('removing the old files in the directory')
    //return del('src/main/resources/static/**', {force:true});
    //execute a shell command to remove the files
    return exec('rm -rf src/main/resources/static/**');
}

function copyReactCodeTask() {
    log('copying React code into the directory')
    return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

exports.default = series(
    clean,
    copyReactCodeTask
);