import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Send webhook on container update:',
        choices: ['No', 'Yes']
    });

    return answer;
}