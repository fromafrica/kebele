// @ts-nocheck
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

import chalk from 'chalk'
import sqlite3 from 'sqlite3'
import { customAlphabet } from 'nanoid'
import { createSpinner } from 'nanospinner'

// core/helper functions
import * as core from '../core/index.js'

// setup questions
import * as questions from '../questions/index.js'

// handle answers
import * as handlers from '../handlers/index.js'

// Use the user's home directory to store the application data
const getAppDataPath = path.join(os.homedir(), '.kebele')

const dbPath = path.join(getAppDataPath, 'kb.db');

if (!fs.existsSync(getAppDataPath)) {
    fs.mkdirSync(getAppDataPath, { recursive: true });
}

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err);
        throw({ message: 'error creating db' })
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS containers (
            id TEXT PRIMARY KEY,
            cid TEXT,
            image TEXT,
            version TEXT,
            ePort TEXT,
            iPort TEXT,
            protocol TEXT,
            status TEXT,
            env TEXT,
            public TEXT,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
    }
})
const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNPRSTWXYZabcdefhijklmnprstwxyz', 8)

// defaults
const config = {}
config.id = nanoid()
config.name = 'my-cool-container'
config.url = 'ghcr.io/fromafrica/hello-world-docker'
config.ePort = 80
config.iPort = 8080
config.addEnv = 'No'
config.cron = 'Every minute'

export default {
    command: ['add'],
    describe: 'setup a new container',
    handler: async (argv) => {
        // welcome message
        await core.welcome("add")
        
        // url of container
        await questions.url().then(async (answer) => {
            const spinner_questions = createSpinner('Loading...').start()
            config.url = answer.result
            await core.sleep(500)
            spinner_questions.success({ text: 'Ok'})
        })

        // name of container
        await questions.name().then(async (answer) => {
            const spinner_questions = createSpinner('Loading...').start()
            config.name = answer.result
            await core.sleep(500)
            spinner_questions.success({ text: 'Ok'})
        })

        // external port
        await questions.ePort().then(async (answer) => {
            const spinner_ePort = createSpinner('Loading...').start()
            config.ePort = answer.result
            await core.sleep(500)
            spinner_ePort.success({ text: 'Ok'})
        })

        // internal port
        await questions.iPort().then(async (answer) => {
            const spinner_iPort = createSpinner('Loading...').start()
            config.iPort = answer.result
            await core.sleep(500)
            spinner_iPort.success({ text: 'Ok'})
        })

        // cron job for container updates
        await questions.cron().then(async (answer) => {
            const spinner_cron = createSpinner('Loading...').start()
            config.cron = answer.result
            await core.sleep(500)
            spinner_cron.success({ text: 'Ok'})
        });

        console.log('\nwriting config to db')
        console.log(config)

        // run handlers
        console.log('\n🐋 Adding container to Docker ')
        await handlers.docker(config).then(async (err) => {
            // good
        }).catch((err) => {
            console.log(err.message ?? 'Operation failed. Please try again or report issues at https://kebele.dev');
            process.exit(1)
        })

        console.log('\n⏰ Creating cron job for container updates')
        await handlers.cron(config).then(async (err) => {
            // good
        }).catch((err) => {
            console.log(err.message ?? 'Operation failed. Please try again or report issues at https://kebele.dev');
            process.exit(err.code ?? 1)
        })

        console.log('\n✅ Testing everything')
        await core.runner()
        console.log('\n🥳 You\'re good!')

        console.log('\nUse ' + chalk.blue('kebele --help') +' for guidance & report issues at https://kebele.dev')

        console.log('\nRun ' + chalk.blue('kebele status') +' to check on your containers\n')
    }
}

// run a handler depending on user selection
//
// unused now but will be used later
//
// if (config.git === 'Yes') {
//     console.log('\n Setting up git repo')
//     await handlers.git()
// }