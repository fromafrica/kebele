import inquirer from 'inquirer';

export default async function (internalPort) {
    const answer = await inquirer.prompt({
        name: 'result',
        message: 'Internal port:',
        default: `${internalPort ?? 8080}`,
    });

    return answer;
}