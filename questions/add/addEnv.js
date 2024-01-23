import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Add environment variables:',
        choices: ['No', 'Yes']
    });

    return answer;
}