import inquirer from 'inquirer';

export default async function () {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Webhook URL:',
        default: 'https://my-cool-app.com/post/webhook',
    });

    return answer;
}