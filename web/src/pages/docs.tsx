// @ts-nocheck
import React, { useEffect } from "react";
import { Button } from 'antd';
const DocsPage = () => {
  const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
  const testOnClick = () =>{
    vscode.postMessage({
      method: 'showMessage',
      params: {
        name: 'git clone的终端',
        cwd: '/Users/chenxing/Desktop/Tets/aaa',
        commands: [
          'git clone http://gitlab.jusda.int/jusda-framework/jusda-fe-umi4.git',
          'cd jusda-fe-umi4',
          'yarn --registry=http://nexus.jusda.int/verdaccio/']
      },
    });
  }

  return (
    <div>
      <Button type="primary" onClick={testOnClick}>Primary Button11</Button>
    </div>
  );
};

export default DocsPage;
