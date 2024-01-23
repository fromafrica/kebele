import inquirer from 'inquirer';

export default async function (externalPort) {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'External port:',
        default: `${externalPort ?? 80}`,
    });

    return answer;
}