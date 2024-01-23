import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'result',
        message: 'Log container vitals:',
        choices: ['Never', '10 sec', '30 sec', '1 min', 'Hourly']
    });

    return answer;
}