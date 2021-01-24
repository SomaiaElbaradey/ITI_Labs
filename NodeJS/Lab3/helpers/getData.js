const fs = require('fs')


module.exports.toDosData =
        fs.readFile("./users.json", (err, data) => {
        if (err) console.error(err);
        else {
            const user = JSON.parse(data);
            // console.log(user)
            return user;
        }
    })
    