import * as vscode from 'vscode';
import { Terminal, TerminalOptions } from 'vscode';

export default function runScript(terminalName: string, cwd: string, commands: any) {
  if (!(commands && commands.length > 0)) {
    return;
  }

  const { terminals } = vscode.window;
  let terminal: Terminal | undefined = terminals.find(({ name }) => {
    return name === terminalName;
  });
  if (!terminal) {
    const terminalOptions: TerminalOptions = { cwd, name: terminalName };
    terminal = vscode.window.createTerminal(terminalOptions);
  }

  terminal.show();
  commands.map((script) =>{
     terminal.sendText(script);
  })
}
