import * as vscode from 'vscode'
import { FolderService } from '../bundles/folderBundle';
import { ffBase } from './ffBase';

export class Folder extends ffBase {
    constructor(
        public readonly label?: string,
        public readonly collapsibleState?: vscode.TreeItemCollapsibleState,
        public readonly _tooltip?: string,
        public readonly command?: vscode.Command
    ) {
        super(label ?? "", collapsibleState);

    }

    get tooltip(): string {
        return `${this._tooltip}`;
    }
    get hasFileOrFolder(): boolean {
        var folderService = new FolderService();
        return Object.keys(this).some(key => folderService.isFileOrFolder(this[key]))
    }
    get hasMultiple(): boolean {
        var folderService = new FolderService();
        return Object.keys(this).filter(key => folderService.isFileOrFolder(this[key])).length > 1;
    }
    contextValue = "folder";
    canBeMerged: true
    mergedWith: ""
}
