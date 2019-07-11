#!/usr/bin/env node

'use strict';

import { createWindowlessApp } from './createWindowlessApp';

const currentNodeVersion: string  = process.versions.node;
const semver: string[] = currentNodeVersion.split('.');
const major: number = Number(semver[0]);

if (isNaN(major) || major < 8) {
    console.error(`You are running Node ${ currentNodeVersion }.\nCreate Windowless App requires Node 8 or higher.\nPlease update your version of Node.`);
    process.exit(1);
}

createWindowlessApp()