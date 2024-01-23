import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Capture container logs:',
        choices: ['No', 'Yes']
    });

    return answer;
}