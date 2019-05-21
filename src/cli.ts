#!/usr/bin/env node
import { cleanPycache } from "./index"
import * as argparse from 'argparse';

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
cleanPycache(args["directory"]);
