import { createSpinner } from 'nanospinner'
import * as core from '../core/index.js'

export default async function (config) {
    const spinner = createSpinner('running...').start()

    await core.sleep(500)

    spinner.success({ text: 'Ok'})

    return '1'
}