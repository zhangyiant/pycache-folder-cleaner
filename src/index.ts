import * as fs from 'fs';
import * as path from 'path';
import rimfaf from 'rimraf';



function walkDir(dir: string) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        console.log("Checking " + dirPath);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f === "__pycache__") {
                console.log("Try to remove " + dirPath);
                rimfaf.sync(dirPath);
            }
            else {
                walkDir(dirPath);
            }
        }
    })
}

export { walkDir as cleanPycache };
