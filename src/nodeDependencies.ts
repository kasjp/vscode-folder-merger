import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { Folder } from "./models/folder";
export class DepNodeProvider implements vscode.TreeDataProvider<Folder> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    Folder | undefined
  > = new vscode.EventEmitter<Folder | undefined>();
  readonly onDidChangeTreeData: vscode.Event<Folder | undefined> = this
    ._onDidChangeTreeData.event;

  constructor(private workspaceRoot: string) {}

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: Folder): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Folder): Thenable<Folder[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage("No Folder in empty workspace");
      return Promise.resolve([]);
    }

    if (element) {
      return Promise.resolve(
        this.getDepsInPackageJson(path.join(this.workspaceRoot))
      );
    } else {
      return Promise.resolve([]);
      // 	return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
      // } else {
      // 	vscode.window.showInformationMessage('Workspace has no package.json');
      // 	return Promise.resolve([]);
      // }
    }
  }

  /**
   * Given the path to package.json, read all its dependencies and devDependencies.
   */
  private getDepsInPackageJson(packageJsonPath: string): Folder[] {
    return [];
    // if (this.pathExists(packageJsonPath)) {
    // 	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // 	const toDep = (moduleName: string, version: string): Folder => {
    // 		if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
    // 			return new Folder(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
    // 		} else {
    // 			return new Folder(moduleName, version, vscode.TreeItemCollapsibleState.None, {
    // 				command: 'extension.openPackageOnNpm',
    // 				title: '',
    // 				arguments: [moduleName]
    // 			});
    // 		}
    // 	};

    // 	const deps = packageJson.dependencies
    // 		? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
    // 		: [];
    // 	const devDeps = packageJson.devDependencies
    // 		? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
    // 		: [];
    // 	return deps.concat(devDeps);
    // } else {
    // 	return [];
    // }
  }
}
