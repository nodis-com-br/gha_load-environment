const core = require('@actions/core');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const fs = require('fs');
const process = require('process');

const artifactClient = artifact.create();
artifactClient.downloadArtifact('environmentVars').then(result => {

    const environmentVars = JSON.parse(fs.readFileSync('./environmentVars.json'));
    for (let k in environmentVars) {
        if (environmentVars.hasOwnProperty(k)) {

            let val = k + '=' + environmentVars[k] + '';

            fs.appendFileSync(process.env.GITHUB_ENV, val);

            // core.info(val);
            // exec.exec("echo '" + val + "' >> $GITHUB_ENV")

        } //core.exportVariable(k, environmentVars[k])
    }

}).catch(err => core.setFailed(err));