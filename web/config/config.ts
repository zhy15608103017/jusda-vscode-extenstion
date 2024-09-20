import { defineConfig } from '@umijs/max';
import routes from './routes';

const resolve = (dir: any) => require('path').join(__dirname, dir);
const chainWebpack: any = (memo: any) => {
  memo.resolve.alias.delete('antd');
};
export default defineConfig({
  // antd: { style: 'less', configProvider: {}, import: true, },
  // hash: true, // fileName hash
  writeToDisk: true, //开启后会在 dev 模式下额外输出一份文件到 build 目录，方便插件调试
  inlineLimit: 1000000, // 1000K
  extraBabelPlugins: ['babel-plugin-dynamic-import-node'],
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  access: {},
  model: {},
  antd: {},
  layout: false,
  dva: {},
  ...routes,
  alias: {
    '@': resolve('src'),
  },
  history: {
    type: 'hash', // router hash
  },
  theme: {
    "@root-entry-name": "variable"
  },
  // theme: {
  //   'primary-color': '#ffc500',
  //   'primary-font-color': '#ea9000',
  //   'label-color': '#8d9aad',
  //   'btn-primary-color': 'black',
  //   'btn-primary-background': '#ffd429',
  // },
  initialState: {},
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  chainWebpack,
  npmClient: 'yarn',
  outputPath: './build',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  mfsu: false,
});
