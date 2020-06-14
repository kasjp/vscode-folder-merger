import * as vscode from 'vscode'

export class ffBase extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly _tooltip?: string,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this._tooltip}`;
    }
    get isFolder(): boolean {
        return this.props.contextValue === "folder";
    }
    get isFile(): boolean {
        return this.props.contextValue === "file";
    }
    props = {
        contextValue: '',
        canBeMerged: false,
        mergedWith: ''
    }
}
 