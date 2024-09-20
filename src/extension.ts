// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import statusBarItem from './statusBarItem';
import initApolloData from './lib/initApolloData';
import initMarkdownContentsByOss from './lib/initMarkdownContentsByOss';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// 拉取apollo配置的信息存储到全局状态中
	initApolloData(context);
	// 通过oss上的文件，拉取markdown内容存储到全局状态中
	initMarkdownContentsByOss(context);
	// 注册组件库页面命令
	require('./jusdaRegister')(context);
	// 右下角触发区域
	statusBarItem();
}

// This method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext) {
	// 清理全局状态中的数据
    context.globalState.update('jusdaApolloData', null);
}
