import { FolderService, Folder } from "../bundles/folderBundle"
import Helpers from "../services/helpers";
export class FolderController {
    folders = [];
    constructor(private workspaceRoot: string) {
    }
    async addFolder({ _folder, callback }: { _folder?: string; callback?: void; } = {}) {
        let folderService = new FolderService(_folder ?? this.workspaceRoot);
        await folderService.getFilesAsync().then(files => {
            this.folders.push(folderService.filesToObject(files));
        }).catch(e => console.error(e));
        /*TRY TO MERGE FOLDERS TOGETHER IF MORE THAN ONE */
        if (this.folders.length > 1) {
            var mergedFolder = new Folder();
            this.folders.forEach(folder => Helpers.mergeObjects(mergedFolder, folder));
            this.folders = [];
            var mf2 = folderService.reduceToFirstFamily(mergedFolder);
            this.folders.push(mf2);
        }
        callback;
    }
}
