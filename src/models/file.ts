import * as vscode from 'vscode'

export class File extends vscode.TreeItem {
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

    get description(): string {
        return "";
    }
    // iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg',
    //     ),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg',
    //     ),
    // };

    props = {
        contextValue: 'file',
        canBeMerged: false,
        mergedWith: "",
    }

    
}
