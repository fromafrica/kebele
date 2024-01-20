import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Check for new container version:',
        choices: ['Every minute', '5 min', '15 min', '30 min', 'Hourly']
    });

    return answer;
}