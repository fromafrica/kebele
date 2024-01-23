import chalk from 'chalk'
import PackageJson from '@npmcli/package-json'

async function getVersion() {
    try {

        const pkg = await PackageJson.load('./')
        const version = pkg.content.version
        return version

    } catch (error) {
        throw ({ message: 'error reading package.json' })
    }
}

export default async function (cmd) {
    
    const pkgVer = await getVersion()

    let greeting

    switch (cmd) {
        case 'add':
            greeting = 'setup a new container'
        break;

        case 'config':
            greeting = 'configure runtime settings'
        break;

        case 'status':
            greeting = 'list all docker containers'
        break;

        default:
            greeting = 'welcome!'
        break;
    }

    console.log(chalk.bgBlue(' kebele ') +' ' + chalk.blue(pkgVer) + ' | ' + chalk.green(cmd) + ' - '+ greeting +' \n')
}