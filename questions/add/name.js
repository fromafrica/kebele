import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Container name:',
        default: 'my-cool-container',
    });

    return answer;
}