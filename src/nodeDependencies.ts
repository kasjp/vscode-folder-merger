import * as vscode from "vscode";
import * as path from "path";
import { Folder, FolderController } from "./bundles/folderBundle";
export class DepNodeProvider implements vscode.TreeDataProvider<Folder> {
    private _onDidChangeTreeData: vscode.EventEmitter<Folder | undefined> = new vscode.EventEmitter<Folder | undefined>();
    readonly onDidChangeTreeData: vscode.Event<Folder | undefined> = this._onDidChangeTreeData.event;

    constructor(private folderController: FolderController) {
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: Folder): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Folder): Thenable<Folder[]> {
        // if (!this.workspaceRoot) {
        //     vscode.window.showInformationMessage("No Folder in empty workspace");
        //     return Promise.resolve([]);
        // }

        if (element) {
            return Promise.resolve(
                this.getFolderChildren(element)
            );
        } else {
            return Promise.resolve(this.initFolder());
            // } else {
            // 	vscode.window.showInformationMessage('Workspace has no package.json');
            // 	return Promise.resolve([]);
            // }
        }
    }
 
    private async getFolderChildren(folder: Folder) {
        return Object.keys(folder).map((key) => {
            if (folder[key]?.constructor?.name === "Folder" ||
                folder[key]?.constructor?.name === "File")
                return folder[key];
        }).filter(f => f != null);
    }
    private async initFolder() {
     
        if (this.folderController.folders.length === 0)
            await this.folderController.addFolder();
        return this.folderController.folders;
      
    }
}
