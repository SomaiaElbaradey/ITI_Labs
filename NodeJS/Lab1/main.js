//! you can add this file to your .gitignore


// var inquirer = require('inquirer');

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync('tasks.json')
// const db = low(adapter)

// db.defaults({ tasks: [] })
//     .write()

// var questions = [
//     {
//         type: 'expand',
//         name: 'operation',
//         message: 'choose your operation?',
//         choices: [
//           {
//             key: 'a',
//             name: 'add task',
//             value: 'add',
//           },
//           {
//             key: 'e',
//             name: 'edit task',
//             value: 'edit',
//           },
//           {
//             key: 'd',
//             name: 'delete task',
//             value: 'delete',
//           },
//         ],
//       },
//       {
//         type: 'rawlist',
//         name: 'beverage',
//         message: 'You also get a free 2L beverage',
//         choices: ['Pepsi', '7up', 'Coke'],
//       },
//   ];
// inquirer.prompt(questions)
//     .then(answers => {
//         console.log('\nOrder receipt:');
//         console.log(JSON.stringify(answers, null, '  '));
//         })
//     .catch(error => {
//         if (error.isTtyError) {
//             // Prompt couldn't be rendered in the current environment
//         } else {
//             // Something else when wrong
//         }
//     });

// db.get('tasks')
//     .push({ id: 1, title: 'lowdb is awesome' })
//     .write()

// // console.log(
// //     db.get('tasks')
// //         .find({ id: 1 })
// //         .value()
// // )
