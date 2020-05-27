import { File, Folder } from "../bundles/folderBundle";
export default class Helpers {
    /**
    * 
    * @param target to merge into, not overriding anything
    * @param source to copy from
    */
    static mergeObjects(target: { [x: string]: any; hasOwnProperty: (key: string) => boolean; }, source: object) {
        // Do nothing if they're the same object
        if (target === source) return;
        // Loop through source's own enumerable properties
        Object.keys(source).forEach((key) => {
            // Get the value
            var val = source[key];
            // Is it a non-null object reference?
            if (val !== null && typeof val === "object") {
                // Yes, if it doesn't exist yet on target, create it
                if (!target.hasOwnProperty(key))
                    target[key] = val;

                // Recurse into that object IF IT DOES NOT CONTAIN CIRCULAR REFERENCES(references of self)
                if (!isCyclic(target[key]) && !isCyclic(source[key]))
                    this.mergeObjects(target[key], source[key]);

                // Not a non-null object ref, copy if target doesn't have it
            } else if (!target.hasOwnProperty(key))
                target[key] = val;

        });

        function isCyclic(obj: any) {
            var seenObjects = [];
            function detect(obj: { [x: string]: any; hasOwnProperty: (key: string) => boolean; }) {
                if (obj && typeof obj === 'object') {
                    if (seenObjects.indexOf(obj) !== -1)
                        return true;

                    seenObjects.push(obj);
                    for (var key in obj)
                        if (obj.hasOwnProperty(key) && detect(obj[key]))
                            return true;
                }
                return false;
            }
            return detect(obj);
        }
    }
}