// @ts-nocheck
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

import fetch from 'node-fetch'
import chalk from 'chalk'

import * as core from '../core/index.js'
import * as questions from '../questions/index.js'
import * as handlers from '../handlers/index.js'

// Use the user's home directory to store the application data
const getAppDataPath = path.join(os.homedir(), '.kebele')

const configPath = path.join(getAppDataPath, 'kb.json');

if (!fs.existsSync(getAppDataPath)) {
    fs.mkdirSync(getAppDataPath, { recursive: true });
}

// defaults
const config = {}
config.webhook = 'No'
config.url = 'ghcr.io/fromafrica/hello-world-docker'
config.ePort = 80
config.iPort = 8080
config.addEnv = 'No'
config.cron = 'Every minute'

export default {
    command: ['config'],
    describe: 'configure runtime settings',
    handler:  async () => {

        await core.welcome("config")

        try {
            

        } catch (error) {


        }
    }
}