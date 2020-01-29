'use strict';

const expect = require('chai').expect
    , FileFilter = require('./FileFilter')
    , nodejsTemplate = require('./zip-templates/nodejs.json')
;

describe('FileFilter', () => {

    describe('nodejs.json', () => {

        it('should contain expected exclusions', () =>{
            const filter = new FileFilter(nodejsTemplate);

            expect(filter.fileExclusions).to.have.members([
                ".gitignore",
                ".npmignore",
                "npm-debug.log"
            ]);

            expect(filter.directoryExclusions).to.contain('.idea', '.git');

            expect(filter.regexExclusions).to.have.length(1);
        });
    });
});