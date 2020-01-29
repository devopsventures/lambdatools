#! /usr/bin/env node

const fs = require('fs')
    , path = require('path')
    , program = require('commander')
    , packageJson = require('../package.json')
;

program
    .version(getVersion(), '-v --version')
    .description('Lambda Tools for building AWS Lambda Functions for Node.js')
;
loadCommands(program);

// Start the application
program.parse(process.argv);

if (process.argv.length === 2) {
    program.outputHelp();
    process.exit(1)
}

function getVersion() {
    return packageJson.version;
}

function loadCommands(program) {
    const commandsDir = path.join(__dirname, '..', 'commands')
        , commands = fs.readdirSync(commandsDir)
        ;

    commands.forEach(command => {
        let file = path.join(commandsDir, command);
        require(file).register(program);
    });
}