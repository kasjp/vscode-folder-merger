import { FolderService } from "../bundles/folderBundle"
import Helpers from "../services/helpers";
export class FolderController {
    folders = [];
    constructor(private workspaceRoot: string) {
    }
    async addFolder(folder?: string, callback?) {
        let folderService = new FolderService(folder ?? this.workspaceRoot);
        await folderService.getFilesAsync().then(files => {
            this.folders.push(folderService.filesToObject(files));
        }).catch(e => console.error(e));
        if (this.folders.length > 1) {
            var goodFolder = {};
            this.folders.forEach(folder => {
                Helpers.mergeObjects(goodFolder, folder);
            });
            this.folders = [];
            this.folders.push(goodFolder);
        }
        if (callback)
            callback();
    }
}
