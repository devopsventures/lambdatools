'use strict';

// Sub Command for Zip

const path = require('path')
    , zip = require('../lib/zip/zip');

module.exports.register = function(program) {
    program
        .command('zip <directory> [outputZipFile]')
        .description('Zips up an application directory for AWS Lambda deployment')
        .option('-t, --template <type>', 'Specify the desired zip template file which contains the exclusion patterns')//TODO need validation of list of values
        .action(zipDirectory)
    ;

    return program;
};

function zipDirectory(directory, outputZipFile, options) {
    let template = options.template || 'nodejs'
        , dir = getAbsoluteDirectoryPath(directory || '.')
    ;

    if (!outputZipFile) {
        outputZipFile = path.join(dir, `${path.basename(dir)}.zip`)
    }

    zip.zip(dir, template, outputZipFile);
}

function getAbsoluteDirectoryPath(dir) {
    if (!dir) {
        return process.cwd()
    } else {
        if (path.isAbsolute(dir)) {
            return path.normalize(dir);
        } else {
            return path.normalize(path.join(process.cwd(), dir));
        }
    }
}