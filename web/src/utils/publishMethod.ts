// @ts-nocheck
import path from 'path';

export function getCloneCommands(projectPath, gitResourceAddress, systemName){
    const { npmRegistryAddress } = window.juslinkVscodeBaseConfig;
	let copyFileCommand = "";
  	const tmpUrl = path.join(projectPath,'tmp/');
	if(systemName === 'win32'){
		copyFileCommand = `robocopy  ${tmpUrl} ${projectPath} /E /XD .git`
	} else {
		copyFileCommand = `rsync -av --exclude='.git' ${tmpUrl} ${projectPath}`;
	}
    const commands = [
		`git clone ${gitResourceAddress} ${tmpUrl}`,
		// `cd ${directoryName}`,
		'npm install -g rimraf',
		copyFileCommand,
		`rimraf ${tmpUrl}`,
		`yarn --registry=${npmRegistryAddress}`
    ];
    return commands;
}

