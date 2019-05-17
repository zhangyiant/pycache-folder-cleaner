"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var argparse = __importStar(require("argparse"));
function walkDir(dir) {
    fs.readdirSync(dir).forEach(function (f) {
        var dirPath = path.join(dir, f);
        console.log("Checking " + dirPath);
        var isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f === "__pycache__") {
                console.log("Try to remove " + dirPath);
                rimraf_1.default.sync(dirPath);
            }
            else {
                walkDir(dirPath);
            }
        }
    });
}
var parser = new argparse.ArgumentParser({
    addHelp: true,
    description: "cleaner for __pycache__ folders"
});
parser.addArgument(['-d', '--directory'], {
    help: "Root directory to clean",
    defaultValue: "."
});
var args = parser.parseArgs();
walkDir(args["directory"]);
