import {
	Hover,
	MarkdownString,
} from "vscode";

function cleanHoverText(document, position){
	// 获取鼠标所在位置的行
	const line = document.lineAt(position.line);
	// 获取整行文本内容
	const lineText = line.text;
	// 正则表达式匹配组件名称
	const componentPattern = /@jusda-tools\/[^'"]+/g;
	const matchedComponents = lineText.match(componentPattern);
	if (matchedComponents && matchedComponents.length > 0) {
		const firstComponentName = matchedComponents[0]; // 获取第一个匹配的组件名称
		return firstComponentName;
	}else{
		return null;
	}
}

function getPackageMDContent(packageName, context) {
	if (packageName && packageName.length > 0) {
		// 从全局上下文获取apollo信息
		// @ts-ignore
		const packageMarkDownContent = context.globalState.get('packageMarkDownContent');
		if (packageMarkDownContent) {
			const simplePackageName = packageName.split('/')[1];
			 // 添加空行分隔表格和标题
			let markdownString = packageMarkDownContent[simplePackageName].replace(/\n###/g, '\n\n###');
			 // 使用正确的表格格式
			 markdownString = markdownString.replace(/ \| /g, '|');
			 // 去掉每一行开头的空格
			 markdownString = markdownString.replace(/^\s+/gm, '');
			return markdownString || "";
		}
	}
	return ``;
}

export default function provideHoverMethod(document, position, token, context) {
	const wordRange = document.getWordRangeAtPosition(position);
	// const word = document.getText(wordRange);
	const packageName = cleanHoverText(document, position);
	const markdownContent = getPackageMDContent(packageName, context);
	// 在这里可以根据悬停的文字 word 来获取你想要显示的内容，这里暂时使用悬停的文字作为提示内容
	const hoverContent = new MarkdownString(markdownContent);
	hoverContent.isTrusted = true; // 设置为 true 启用 HTML 渲染
	return new Hover(hoverContent, wordRange);
}

