const fs = require('fs')

module.exports.usersData = async function getUsersData() {
    const users = await fs.promises.readFile("./users.json", 'utf-8');
    return JSON.parse(users);
};