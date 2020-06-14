import * as vscode from "vscode";
import * as path from "path";
import { Folder, FolderController, FolderService } from "./bundles/folderBundle";
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

        if (element) {
            return Promise.resolve(
                this.getFolderChildren(element)
            );
        } else {
            return Promise.resolve(this.initFolder());
        }
    }

    private async getFolderChildren(folder: Folder) {
        var folderService = new FolderService();
        return Object.keys(folder).map((key) => {
            if (folderService.isFileOrFolder(folder[key]))
                return folder[key];
        }).filter(f => f != null);
    }
    private async initFolder() {

        if (this.folderController.folders.length === 0)
            await this.folderController.addFolder();
        return this.folderController.folders;

    }
}
