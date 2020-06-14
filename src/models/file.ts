import * as vscode from 'vscode'
import { ffBase } from './ffBase';

export class File extends ffBase {
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
    contextValue = "file";

}
