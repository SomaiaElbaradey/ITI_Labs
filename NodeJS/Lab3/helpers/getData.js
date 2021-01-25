const fs = require('fs')

module.exports.toDosData = async function getToDoData() {
    const toDos = await fs.promises.readFile("./toDos.json", 'utf-8');
    return JSON.parse(toDos);
};