// @ts-nocheck
import inquirer from 'inquirer'
import chalk from 'chalk'

import * as core from '../../core/index.js'

export default async function (externalPort) {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'External port:',
        default: `${externalPort ?? 80}`,
    })

    try {

        const query = core.db.prepare("SELECT COUNT(ePort) as count from containers where ePort = ?")    

        const count = query.all(answer.result)

        if (count[0] && count[0].count > 0) {
            console.error('')
            console.error(chalk.red('error') +': external port already exists')
            console.error('')
            console.error('please pick a new one or report issues at https://kebele.dev')
            console.error('')
            process.exit(1)
        }
       
        await core.sleep(300)

    } catch (error) {
        console.error('operation failed')
        console.error('')
        console.error('please try again or report issues at https://kebele.dev')
        console.error('')
        process.exit(1)
    }

    return answer
}