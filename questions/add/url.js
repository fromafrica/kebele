import inquirer from 'inquirer'
import chalk from 'chalk'

import * as core from '../../core/index.js'

export default async function () {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Container URL:',
        default: 'https://github.com/fromafrica/kebele',
    });

    try {

        // first validate input before querying db
        const validUrl = await core.validateUrl(answer.result)

        if (!validUrl) {
            console.error('')
            console.error(chalk.red('error') +': please pick a valid url')
            console.error('')
            console.error('report issues at https://kebele.dev')
            console.error('')
            process.exit(1)
        }

        const query = core.db.prepare("SELECT COUNT(url) as count from containers where url = ?")    

        const count = query.all(answer.result)

        if (count[0] && count[0].count > 0) {
            console.error('')
            console.error('container url already exists')
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

    return answer;
}