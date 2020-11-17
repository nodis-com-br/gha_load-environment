const core = require('@actions/core');
const artifact = require('@actions/artifact');
const fs = require('fs');
const process = require('process');

const artifactClient = artifact.create();
artifactClient.downloadArtifact('environmentVars').then(result => {

    const environmentVars = JSON.parse(fs.readFileSync('./environmentVars.json'));
    const stream = fs.createWriteStream(process.env.GITHUB_ENV, {flags:'a'});

    for (let k in environmentVars) environmentVars.hasOwnProperty(k) && stream.write(k + '=' + environmentVars[k] + '\n');

}).catch(err => core.setFailed(err));