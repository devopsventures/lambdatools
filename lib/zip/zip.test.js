'use strict';

const path = require('path')
  , zip = require('./zip')
;

describe('zip', () => {

  describe('test_dir', () => {

    const dir = path.join(__dirname, '..', '..', 'test', 'test_dir');

    it('should build a zip for nodejs', async () => {
      const file = await zip.zip(dir, 'nodejs', path.join(__dirname, '..', '..', 'test.zip'));
      console.log(`ZIP FILE: ${file}`);
    });
  });

});