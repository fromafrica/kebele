#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// commands
import * as commands from './commands/index.js'

// hack
process.on('SIGINT', () => {
    process.exit(0);
})

try {
    yargs(hideBin(process.argv))
    .scriptName("kebele")
    .command(commands.config)
    .command(commands.add)
    .command(commands.status)
    .demandCommand(0)
    .help()
    .parse()
    
} catch (err) {
    console.error(err.message ?? 'operation failed')
    console.log('')
    console.log('please try again or report issues at https://kebele.dev')
    console.log('')
    process.exit(1)
}