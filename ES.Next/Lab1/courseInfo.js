// Create your own function that accepts multiple parameters to generate course information and display it.

function courseInfo(options = { courseName, courseDuration, courseOwner }) {

    if (typeof options != "object")
        throw ('expected options to be object')

    let flag = Object.getOwnPropertyNames(options).every((item) => {
        return item === "courseName" || item === "courseDuration" || item === "courseOwner";
    })

    if (flag == false)
        throw ("expected courseName or courseDuration or courseOwner parameters");

    if (Object.keys(options).length === 0)
        throw ("expected at least one parameter");

    let defaults = {
        courseName: "DataBase",
        courseDuration: 19,
        courseOwner: "Mohamed"
    }

    let result = Object.assign(defaults, options)
    console.log(result)
}

//wrong defination
// courseInfo({ userName: "Ahmed" })
// courseInfo({})

//correct defination
courseInfo({ courseName: "ES" })
courseInfo({ courseDuration: 15 })
courseInfo({ courseOwner: "Menna" })
courseInfo({ courseName: "ES6", courseOwner: "Menna", courseDuration: 3 })
console.log(".......................................");