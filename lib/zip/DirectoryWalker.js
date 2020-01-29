'use strict';

const fs = require('fs').promises
  , path = require('path')
;

module.exports = class DirectoryWalker {

  constructor(directory) {
    this._baseDirectory = directory;
    this._filter = null;
  }

  set filter(fileFilter) {
    if (fileFilter && fileFilter['excludeItem'] instanceof Function) {
      this._filter = fileFilter
    } else {
      throw new Error('Invalid FileFilter provided');
    }
  }

  getFiles() {
    const self = this;
    self._files = [];

    return this._processFsItem(this._baseDirectory)
      .then(() => {
        return self._files;
      });
  }

  _processDirectory(dir) {
    const self = this;

    return fs.readdir(dir)
      .then(contents => {
        const promises = [];

        contents.forEach(fsItem => {
          promises.push(self._processFsItem(path.join(dir, fsItem)))
        });

        return Promise.all(promises);
    });
  }

  _excludeFsItem(fsItem, stats) {
    let result = false;

    if (this._filter) {
      result = this._filter.excludeItem(fsItem, stats);
    }

    return result;
  }

  _processFsItem(fsPath) {
    const self = this;

    return fs.stat(fsPath)
      .then(fsStat => {

        if (!self._excludeFsItem(fsPath, {isDirectory: fsStat.isDirectory, isFile: fsStat.isFile})) {
          if (fsStat.isDirectory()) {
            return this._processDirectory(fsPath);
          } else if (fsStat.isFile()) {
            self._registerFile(fsPath, fsStat);
          }
        }
      });
  }

  //TODO clean up
  _registerFile(file, stat) {
    // this._files.push({file: file, stat: stat});
    this._files.push(file);
  }
};