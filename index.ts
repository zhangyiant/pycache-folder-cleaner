import * as fs from 'fs';
import * as path from 'path';
import rimfaf from 'rimraf';
import * as process from 'process';
import * as argparse from 'argparse';


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

let parser: argparse.ArgumentParser = new argparse.ArgumentParser(
    {
        addHelp: true,
        description: "cleaner for __pycache__ folders"
    }
);
parser.addArgument(
    ['-d', '--directory'],
    {
        help: "Root directory to clean",
        defaultValue: "."
    }
);

let args = parser.parseArgs();
walkDir(args["directory"]);
