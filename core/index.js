// node
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import Database from 'better-sqlite3'

// internal
import welcome from "./welcome.js";
import runner from "./runner.js";
import detect from "./detect.js";
import checkDocker from "./checkDocker.js";
import validateUrl from './validateUrl.js';
import dockerRequest from './dockerRequest.js';

// small exports
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// Use the user's home directory to store the application data
const appDataPath = path.join(os.homedir(), '.kebele')

const dbPath = path.join(appDataPath, 'kb.db');

if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath, { recursive: true });
}

const db = new Database(dbPath);

export {
    welcome,
    runner,
    detect,
    sleep,
    appDataPath,
    dbPath,
    db,
    checkDocker,
    validateUrl,
    dockerRequest
}