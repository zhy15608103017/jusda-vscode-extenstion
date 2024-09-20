// @ts-nocheck
import { useEffect, useState } from 'react';

const useVsCodeApi = () => {
  const [vscodeApi, setVscodeApi] = useState(null);

  useEffect(() => {
    const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    setVscodeApi(vscode);

    return () => {
      vscode.setState({});
    };
  }, []);

  return vscodeApi;
};

export default useVsCodeApi;