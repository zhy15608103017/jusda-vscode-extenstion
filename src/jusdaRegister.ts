import * as vscode from 'vscode';
import provideHoverMethod from './lib/tangramDoc';
import { createUmiWebviewPanel } from './vscode-utils/webview';

module.exports = function (context) {
    context.subscriptions.push(
        vscode.commands.registerCommand("extension.openCompontsWeb", function (uri) {
            const panel = createUmiWebviewPanel(context,'componts',"Juslink Materiel",'images/icon1.png');
            // const panel = vscode.window.createWebviewPanel(
            //     "componts", // viewType
            //     "JUSDA Componts", // 视图标题
            //     vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            //     {
            //         enableScripts: true // 启用JS，默认禁用
            //     }
            // );
            // let global = { panel };
            // panel.webview.html = getWebViewContent(
            //     context,
            //     panel,
            //     "web/build/jusda-components.html"
            //     // "src/view/jusda/jusda-components.html"
            // );
            // invokeCallback(panel, {}, uri);
            // panel.webview.onDidReceiveMessage(
            //     message => {
            //         // if (message.cmd === 'writeFile') {
            //         //     panel.webview.postMessage({ 'fileUrl': ComponentPath});
            //         //     // console.log('panel.webview.postMessage:222 ', global.webview.postMessage);
            //         //     console.log('2222', ComponentPath);
            //         //     const File = new file();
            //         //     console.log('11111');
            //         //     File.addDir(`Jsuda-${message.title}`);
            //         //     File.createAndWriteFile(`Jsuda-${message.title}`, '/index.jsx', message.jsx);
            //         //     File.createAndWriteFile(`Jsuda-${message.title}`, '/index.less', message.less);
            //         // }
            //         if (messageHandler[message.cmd]) {
            //             messageHandler[message.cmd](global, message, uri);
            //         } else {
            //             util.showError(`未找到名为 ${message.cmd} 回调方法!`);
            //         }
            //     },
            //     undefined,
            //     context.subscriptions
            // );
        })
    );
    const registrationHover = vscode.languages.registerHoverProvider(['javascript', 'typescript'],  { provideHover(document, position, token){
        // 调用你封装的方法，并传递上下文参数
        const hoverContent = provideHoverMethod(document, position, token, context);
        // 返回悬停提示内容
        return hoverContent;
    } });
    context.subscriptions.push(registrationHover);
};