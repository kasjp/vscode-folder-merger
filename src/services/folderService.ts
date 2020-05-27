import { File, Folder } from "../bundles/folderBundle";
import { TreeItemCollapsibleState } from "vscode";
import Helpers from "./helpers";

const { resolve } = require('path');
const { readdir } = require('fs').promises;

export class FolderService {
    constructor(public folderPath: string) { }

    /**
     * 
     * @param path path to read, including child directories/files
     */
    async getFilesAsync(path?: string): Promise<Array<string>> {
        var dir = path ?? this.folderPath;
        const dirents = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent: { name: string; isDirectory: () => boolean; }) => {
            const res = resolve(dir, dirent.name);
            //Recurse into self if it's a directory
            return dirent.isDirectory() ? this.getFilesAsync(res) : res;
        }));
        return Array.prototype.concat(...files);
    }

    /**
     * 
     * @param files to map into a Folder/File object
     */
    filesToObject(files: Array<string>): object {
        var fileMap = {};
        files.forEach(file => {
            //converts file:string to Folder/File object
            var fileObj = this.filePathToObject(file);
            //Merges into main fileMap
            Helpers.mergeObjects(fileMap, fileObj);
        })
        return fileMap;
    }

    /**
     * 
     * @param file to convert to a Folder/File object
     */
    filePathToObject(file: string) {
        var splitFile = file.split("/").filter(f => f !== "");
        const reducer = (total: {}, current: string) => {
            if (Object.keys(total).length === 0) {
                return { [current]: new File(current, TreeItemCollapsibleState.None) }
            } else {
                return { [current]: (Object.assign(new Folder(current, TreeItemCollapsibleState.Collapsed), total) as Folder) };
            }
        };
        var ret = splitFile.reduceRight(reducer, {});
        var isFolder = ret[Object.keys(ret)[0]]?.constructor?.name === "Folder";
        if (isFolder)
            return ret[Object.keys(ret)[0]] as Folder;
        return ret[Object.keys(ret)[0]] as File;
    }


}
