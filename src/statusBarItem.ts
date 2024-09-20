import * as vscode from 'vscode';
import util from './vscode-utils/util';
// const util = require('./vscode-utils/util');


export default () => {
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	statusBarItem.text ='Juslink';
	statusBarItem.color = '#FCC500';
	statusBarItem.command = 'extension.openCompontsWeb';
	statusBarItem.show();
	// util.showInfo('你可通过右下角的Jusda进入组件库');
};
