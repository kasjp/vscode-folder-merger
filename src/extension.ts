'use strict';

import * as vscode from 'vscode';

import { DepNodeProvider } from './nodeDependencies';
import { Folder } from './models/folder';
import { FolderController } from './controllers/folderController';
const folderController = new FolderController(vscode.workspace.rootPath);
export function activate(context: vscode.ExtensionContext) {

    // Samples of `window.registerTreeDataProvider`
    const nodeDependenciesProvider = new DepNodeProvider(folderController);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
    vscode.commands.registerCommand('nodeDependencies.addEntry', async () => folderController.addFolder(
        {
            _folder: await vscode.window.showOpenDialog({
                canSelectMany: false,
                canSelectFolders: true,
                openLabel: 'Open',
                filters: {
                    'All files': ['*']
                }
            }).then(uri => uri[0].path), callback: nodeDependenciesProvider.refresh()
        })
    );
    vscode.commands.registerCommand('nodeDependencies.editEntry', (node: Folder) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('nodeDependencies.deleteEntry', (node: Folder) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
}