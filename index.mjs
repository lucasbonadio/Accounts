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

   console.log(action)
    
}).catch(err => {
    console.log(err)
})
}


