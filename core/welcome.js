import chalk from 'chalk'
import PackageJson from '@npmcli/package-json'

async function getVersion() {
    try {
        const pkg = await PackageJson.load('./');
        const version = pkg.content.version;
        return version;
    } catch (error) {
        throw ({ message: 'error reading package.json' })
    }
}

export default async function () {
    
    const pkgVer = await getVersion()

    console.log(chalk.bgBlue(' kebele ') +' ' + chalk.blue(pkgVer) + ' welcome! \n');
}