import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Container URL:',
        default: 'ghcr.io/fromafrica/hello-world-docker',
    });

    return answer;
}