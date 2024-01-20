#!/usr/bin/env node

import chalk from 'chalk'

// setup questions
import * as questions from './questions/index.js'

// handle answers
import * as handlers from './handlers/index.js'

// core/helper functions
import * as core from './core/index.js'

// defaults
const config = {}
config.pkgmgr = core.detect(process.env.npm_execpath)
config.name = 'my-cool-container'
config.url = 'ghcr.io/fromafrica/hello-world-docker'
config.ePort = 80
config.iPort = 8080
config.addEnv = 'No'
config.cron = 'Every minute'

try {
    // welcome message
    await core.welcome()

    // name of container
    await questions.name().then(async (answer) => {
        config.name = answer.result
        await core.runner()
    })
    
    // url of container
    await questions.url().then(async (answer) => {
        config.url = answer.result
        await core.runner()
    })

    // external port
    await questions.ePort().then(async (answer) => {
        config.ePort = answer.result
        await core.runner()
    })

    // internal port
    await questions.iPort().then(async (answer) => {
        config.iPort = answer.result
        await core.runner()
    })

    // environment variables
    await questions.addEnv().then(async (answer) => {
        config.addEnv = answer.result
        await core.runner()
    });

    // cron job for container updates
    await questions.cron().then(async (answer) => {
        config.cron = answer.result
        await core.runner()
    });

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

    console.log('\nUse ' + chalk.blue('kebele --help') +' for guideance &  https://kebele.dev\n')

} catch (err) {

    console.log(err.message ?? 'Operation failed. Please try again or report issues at https://kebele.dev')

    process.exit(err.code ?? 1)
}

// run a handler depending on user selection
//
// unused now but will be used later
//
// if (config.git === 'Yes') {
//     console.log('\n Setting up git repo')
//     await handlers.git()
// }