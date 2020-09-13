import * as vscode from 'vscode';

export class Config {
  readonly rootSection = 'nix';

  private get cfg(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(this.rootSection);
  }

  private get<T>(path: string): T {
    return this.cfg.get<T>(path)!;
  }

  get rnixLspPath(): string {
    return this.get<string>('rnix-lspPath');
  }
}
