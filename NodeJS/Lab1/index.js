const { Command, action } = require('commander');
const program = new Command();
program.version('0.0.1');
const fs = require('fs-extra');

program
    .command('add')
    .requiredOption('-t, --tittle, <type>', 'the task tittle')
    .description('add task in your to-do list')
    .action((options) => { add(options) })
program
    .command('list')
    .option('-s, --status, <type>', 'the task status')
    .description('listing your to-do list, use -s --status to list depending on your status')
    .action((options) => { list(options) })
program
    .command('edit')
    .requiredOption('-t, --tittle, <type>', 'the task tittle')
    .requiredOption('-i, --id <type>', 'the task id')
    .option('-s, --status, <type>', 'the task status')
    .description('edit an existing task in your to-do list')
    .action((options) => { editList(options) })
program
    .command('delete')
    .requiredOption('-i, --id <type>', 'the task id')
    .description('delete task from your to-do list')
    .action((options) => { deleteTask(options) })

program.parse(process.argv);

function add(opts) {
    fs.readFile('./to-do.json', function (err, data) {
        if (err) return console.error(err);
        let tasks = JSON.parse(data || "[]");

        //setting the id incrementally - I avoided using the length prop to avoid replicating the id if any has been deleted
        const id = tasks.length === 0 ? 0 : (tasks[tasks.length - 1].id + 1);

        //didn't understand clearly how to add using map function
        // tasks.map((ele, i , arr) => {
        //     console.log(i) 
        //     console.log(id)
        // });

        tasks.push({
            'tittle': opts.tittle,
            'id': id,
            'status': opts.status || 'to-do'
        })
        fs.writeFile("./to-do.json", JSON.stringify(tasks), err => {
            if (err) return console.error(err)
            console.log('the tittle has been added successfully!')
        })
    })
}

function list(options) {
    fs.readFile('./to-do.json', (err, data) => {
        if (err) return console.error(err)
        let tasks = JSON.parse(data);
        if (options.status) {
            tasks = tasks.filter((ele) => {
                return ele.status == options.status;
            })
        }
        console.log(tasks);
        return tasks
    })
}

function deleteTask(options) {
    fs.readFile('./to-do.json', (err, data) => {
        if (err) return console.error(err)
        let tasks = JSON.parse(data);
        tasks = tasks.filter(ele => {
            return ele.id != options.id;
        });
        fs.writeJson('./to-do.json', tasks, err => {
            if (err) return console.error(err)
            console.log('the tittle has been deleted successfully!')
        })
    })
}

function editList(options) {
    fs.readFile('./to-do.json', (err, data) => {
        if (err) return console.error(err)
        let found = 0;
        let tasks = JSON.parse(data);
    
        tasks.map(element => {
            if (element.id == options.id) {
                if (options.status) {
                    if (options.status == "done" || options.status == "in progress" || options.status == "to-do") {
                        element.status = options.status;
                    }
                }
                if (options.tittle) {
                    element.tittle = options.tittle;
                }
                found = 1;
            }
        });
        if (!found) throw 'the specified id does not exist'
        fs.writeJson('./to-do.json', tasks, err => {
            if (err) return console.error(err)
            console.log('the task info has been edited successfully!')
        })
    })
}