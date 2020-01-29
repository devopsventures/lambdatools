'use strict';

const fs = require('fs')
  , path = require('path')
  , archiver = require('archiver')
  , FileFilter = require('./FileFilter')
  , DirectoryWalker = require('./DirectoryWalker')
;

module.exports.zip = function (dir, templateName, outputFile) {
  const zip = archiver('zip', {zlib: {level: 9}})
    , fileFilter = new FileFilter(require(`./zip-templates/${templateName}.json`))
    , outputFileName = path.normalize(outputFile)
    , output = fs.createWriteStream(outputFileName)
  ;

  output.on('end', function () {
    console.log(`File written ${outputFileName}`)
  });

  output.on('close', function () {
    console.log(`File written ${outputFileName}`)
  });

  zip.on('warning', (err) => {
    //TODO maybe check err.code ENOENT
    throw err;
  });

  zip.on('error', err => {
    throw err;
  });

  zip.pipe(output);

  return getFiles(dir, fileFilter)
    .then(files => {
      if (files && files.length > 0) {
        files.forEach(file => {
          let zipFilePath = file;
          if (file.indexOf(dir) === 0) {
            zipFilePath = file.substr(dir.length + 1);
          }

          zip.file(file, {name: zipFilePath})
        });
      }
    })
    .then(() => {
      zip.finalize();
      return outputFile;
    });
};


function getFiles(dir, fileFilter) {
  const walker = new DirectoryWalker(dir);
  walker.filter = fileFilter;

  return walker.getFiles();
}