import * as path from "path";
import * as winston from 'winston';
import { WindowsToaster } from 'node-notifier';

// App Name
const AppName: string = "<APPNAME>";

const executable: string = process.argv[0];

// Args (ignore exe + js)
const argv: string[] = process.argv.slice(2);

// Notifier init
const snoreToastPath: string = executable.endsWith(".exe")  ? path.join(executable, "../", "SnoreToast.exe") : null;
const notifier = new WindowsToaster({withFallback: !!snoreToastPath, customPath: snoreToastPath});

// Logger init
const {combine, timestamp, printf, label} = winston.format;
const transports = {
    file: new winston.transports.File({filename: `${AppName}.log`})
};
transports.file.level = "debug";
const logger: winston.Logger = winston.createLogger({
    level: 'debug',
    format: combine(
        label({label: '[my-label]'}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
    ),
    transports: [transports.file]
});


// Log message
logger.log("info", `"${AppName}" started with ${argv ? argv.join("; ") : "no args"}`);

// Notify
notifier.notify({title: `${AppName}`,  message: 'Hello World' });
