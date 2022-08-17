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
        } else if (action === 'Check balance') {

        } else if (action === 'Deposit') {
            deposit()
        } else if (action === 'Withdraw') {

        } else if (action === 'Exit') {
            console.log(chalk.bgCyan("Thanks for using the Accounts!"))
            process.exit();
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
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.red('This account already exists, choose other name'))
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (error) => {
            console.log(error);
        })

        console.log(chalk.green("Congratulations, your account was created with a sucessful"));
        operation();

    }).catch(err => console.log(err));
}

// Function to Deposit
function deposit(accountName) {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Enter the name of account to deposit:'
    }]).then(response => {
        const accountName = response['accountName']

        if (!checkAccount(accountName)) {
            return deposit();
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'How much do you want to deposit:'
        }]).then(response => {
            const amount = response['amount'];
            addAmount(accountName, amount);
            operation();
        }).catch(err => console.log(err));


    }).catch(err => console.log(err));

}

//Functions that may be reused
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.red("This account doesn't exists, please enter other name"));
        return false;
    } else {
        return true
    }
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.red('Put a value to deposit'));
        deposit();
    } else {
        accountData.balance += Number(amount);
        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => console.log(err));
    }

    console.log(chalk.green(`Was deposited with sucessful the amount of the ${amount}`));
}

function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJson);

}




