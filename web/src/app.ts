//@ts-ignore
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
// import { getAntdConfig, initCssVariables } from "@jusda-tools/jusda-theme-config";
// ConfigProvider.config({
//   theme: getAntdConfig('v5'),
// });
// initCssVariables();

// @ts-ignore
// eslint-disable-next-line
// const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;

export async function render(oldRender: any) {
  oldRender();
}
