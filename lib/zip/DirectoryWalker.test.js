'use strict';

const path = require('path')
  , DirectoryWalker = require('./DirectoryWalker')
  , FileFilter = require('./FileFilter')
;

describe('DirectoryWalker', () => {

  describe('#test_dir', () => {

    const dir = path.join(__dirname, '..', '..', 'test', 'test_dir');

    it('should process contents with no filter', async () => {
      const walker = new DirectoryWalker(dir);

      const results = await walker.getFiles();
      console.log(results);
    });

    it('should process contents with file filter', async () => {
      const walker = new DirectoryWalker(dir);
      walker.filter = new FileFilter({
        exclude: {
          files: ['index.js']
        }
      });

      const results = await walker.getFiles();
      console.log(results);
      //TODO complete tests
    });

    it('should process contents with directory filter', async () => {
      const walker = new DirectoryWalker(dir);
      walker.filter = new FileFilter({
        exclude: {
          directories: ['.idea', 'axios']
        }
      });

      const results = await walker.getFiles();
      console.log(results);
      //TODO complete tests
    });
  });
});