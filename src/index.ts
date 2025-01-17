import { createWindowlessApp } from "./createWindowlessApp";
import { checkMsbuildInPath } from "./launcherCompiler";

const currentNodeVersion: string = process.versions.node;
const semver: string[] = currentNodeVersion.split(".");
const major = Number(semver[0]);

if (isNaN(major) || major < 10) {
    console.error(`You are running Node ${currentNodeVersion}.\nCreate Windowless App requires Node 10 or higher.\nPlease update your version of Node.`);
    process.exit(1);
}

// Check for msbuild.exe in %PATH%
checkMsbuildInPath(true).then(() => {
    // noinspection JSIgnoredPromiseFromCall
    createWindowlessApp(process.argv);
});
