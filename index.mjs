// Externs Modules
import inquirer from 'inquirer';
import chalk from 'chalk';

// Interns Modules
import fs from 'fs';

operation();

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Make account', 'Check balance', 'Deposit', 'Withdraw', 'Exit'],
    },
    ]).then(response => {
        const action = response['action'];

        if (action === 'Make account') {
            createAccount()
        }

    }).catch(err => {
        console.log(err)
    })
}

// Functions associated to create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Thanks for choosing our bank!'));
    console.log(chalk.green('Define the options of your account in the next step'));
    buildAccount();
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Enter a name for your account:'
        }
    ]).then(response => {
        const accountName = response['accountName'];

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.red('This account already exist, choose other name'))
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (error) => {
            console.log(error);
        })

        console.log(chalk.green("Congratulations, your account was created with a sucessful"));
        operation();

    }).catch(err => console.log(err))
}






