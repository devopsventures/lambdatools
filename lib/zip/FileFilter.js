'use strict';

const path = require('path');

module.exports = class FileFilter {

    constructor(config) {
        validateConfig(config);

        this._regexExclusions = [];
        this._directoryExclusions = [];
        this._fileExclusions = [];

        if (config.exclude) {
            if (config.exclude.files) {
                this._fileExclusions = this._fileExclusions.concat(config.exclude.files);
            }

            if (config.exclude.directories) {
                this._directoryExclusions = this._directoryExclusions.concat(config.exclude.directories);
            }

            if (config.exclude.regexFilters) {
                config.exclude.regexFilters.forEach(pattern => {
                    this._regexExclusions.push(new RegExp(pattern));
                });
            }
        }
    }

    get directoryExclusions() {
        return this._directoryExclusions;
    }

    get fileExclusions() {
        return this._fileExclusions;
    }

    get regexExclusions() {
        return this._regexExclusions;
    }

    excludeItem(filename, stats) {
        const regexExclusions = this.regexExclusions
          , directoryExclusions = this.directoryExclusions
          , fileExclusions = this.fileExclusions
          , pathParts = path.parse(filename)
        ;

        let excluded = false;

        if (regexExclusions) {
            regexExclusions.forEach(expression => {
                if (!excluded) {
                    excluded = expression.test(filename)
                }
            })
        }

        if (stats.isDirectory && directoryExclusions && !excluded) {
            excluded = directoryExclusions.indexOf(pathParts.base) > -1;
        }

        if (stats.isFile && fileExclusions && !excluded) {
            excluded = fileExclusions.indexOf(pathParts.base) > -1;
        }

        return excluded;
    }
};

function validateConfig(config) {
    if (!config.exclude) {
        throw new Error('Exclusions need to be defined in the config template');
    }
}