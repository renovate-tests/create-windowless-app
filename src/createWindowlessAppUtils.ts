import type { InvalidNames, LegacyNames } from "validate-npm-package-name";
import validateProjectName from "validate-npm-package-name";
import chalk from "chalk";
import path from "path";
import { readJsonFile, writeJson } from "./fileUtils";
import consts from "./consts";
import * as fs from "fs-extra";

// These files should be allowed to remain on a failed install, but then silently removed during the next create.
const errorLogFilePatterns = consts.errorLogFilePatterns;

export const PACKAGE_JSON_FILENAME = "package.json";

// If project only contains files generated by GH, it’s safe.
// Also, if project contains remnant error logs from a previous installation, lets remove them now.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebook/create-react-app/pull/368#issuecomment-243446094
export const isSafeToCreateProjectIn = (root: string, name: string): boolean => {
    const validFiles: string[] = consts.validFiles;
    console.log();

    const conflicts = fs
        .readdirSync(root)
        .filter((file) => !validFiles.includes(file))
        // IntelliJ IDEA creates module files before CRA is launched
        .filter((file) => !/\.iml$/.test(file))
        // Don't treat log files from previous installation as conflicts
        .filter((file) => !errorLogFilePatterns.some((pattern) => file.indexOf(pattern) === 0));

    if (conflicts.length > 0) {
        console.log(`The directory ${chalk.green(name)} contains files that could conflict:`);
        console.log();
        for (const file of conflicts) {
            console.log(`  ${file}`);
        }
        console.log();
        console.log("Either try using a new directory name, or remove the files listed above.");

        return false;
    }

    // Remove any remnant files from a previous installation
    const currentFiles = fs.readdirSync(path.join(root));
    currentFiles.forEach((file) => {
        errorLogFilePatterns.forEach((errorLogFilePattern) => {
            // This will catch `npm-debug.log*` files
            if (file.indexOf(errorLogFilePattern) === 0) {
                fs.removeSync(path.join(root, file));
            }
        });
    });
    return true;
};

const printValidationResults = (results) => {
    if (typeof results !== "undefined") {
        results.forEach((error) => {
            console.error(chalk.red(`  *  ${error}`));
        });
    }
};

export const checkAppName = (appName) => {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(`Could not create a project called ${chalk.red(`"${appName}"`)} because of npm naming restrictions:`);
        printValidationResults((validationResult as InvalidNames).errors);
        printValidationResults((validationResult as LegacyNames).warnings);
        process.exit(1);
    }

    const dependencies = [...consts.dependencies, ...consts.devDependencies].sort();
    if (dependencies.indexOf(appName) >= 0) {
        console.error(
            chalk.red(
                `We cannot create a project called ${chalk.green(appName)} because a dependency with the same name exists.\n` + "Due to the way npm works, the following names are not allowed:\n\n"
            ) +
            chalk.cyan(dependencies.map((depName) => `  ${depName}`).join("\n")) +
            chalk.red("\n\nPlease choose a different project name.")
        );
        process.exit(1);
    }
};

export const getNexeCommand = (appName: string, nodeVersion: string): string => {
    return `nexe -t ${nodeVersion} -o dist/${appName}.exe`;
};

export const mergeIntoPackageJson = (root: string, field: string, data: any): void => {
    const packageJsonPath = path.resolve(root, PACKAGE_JSON_FILENAME);
    const packageJson = readJsonFile(packageJsonPath);
    if (Array.isArray(data)) {
        const list = (packageJson[field] || []).concat(data).reduce((acc, cur) => {
            acc[cur] = cur;
            return acc;
        }, {});
        packageJson[field] = Object.keys(list);
    }
    else {
        packageJson[field] = Object.assign(packageJson[field] || {}, data);
    }
    writeJson(packageJsonPath, packageJson);
};

export const replaceAppNamePlaceholder = (str: string, appName: string): string => {
    return str.replace(/##APPNAME##/g, `${appName}`);
};
