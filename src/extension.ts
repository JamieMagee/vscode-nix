import { ExtensionContext, window, workspace } from 'vscode';
import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
  RevealOutputChannelOn,
  ServerOptions,
} from 'vscode-languageclient';
import { Config } from './configuration';

let client: LanguageClient;
const config = new Config();

export function activate(context: ExtensionContext) {
  const serverExecutable: Executable = {
    command: config.rnixLspPath,
  };

  const serverOptions: ServerOptions = serverExecutable;

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'nix' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.nix'),
    },
    revealOutputChannelOn: RevealOutputChannelOn.Error,
    outputChannel: window.createOutputChannel('Nix'),
    traceOutputChannel: window.createOutputChannel('Nix (Trace)'),
  };

  client = new LanguageClient(
    'nix',
    'Nix Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
