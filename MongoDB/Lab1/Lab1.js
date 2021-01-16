// 1 – Create a new database called “iti” and create collection (implicitly) called “learners” and insert one document contains your
// name, age, hobbies and mail.
use iti
db.learners.insertOne({ name: 'somaya', age: 23, hobbies: ['photography', 'ping-pong'], mail: 'somayaMostafa@gmail.com' })

// 2 – Insert more than one document into “learners” collection with
// your friends’ names, ages and email addresses only using one command.
db.learners.insertMany([{ name: 'Sarah', age: 23, email_addresses: 'rodriguezodell@mailtoyou.top' },
                        { name: 'Alaa', age: 25, email_addresses: 'jayceeking@deliverme.top' },
                        { name: 'Sondos', age: 17, email_addresses: 'lolacassin@secureinvox.com' },
                        { name: 'Asmaa', age: 15, email_addresses: 'asmaasef@deliverme.com' }
                       ])

// 3 – Create another collection (explicitly) name it “courses”.
db.createCollection('courses')

// 4 – Insert 5 documents into “courses” collection describes courses' names and the name of the instructor that worked 
// on with you on the course.
db.courses.insertMany([{ name: 'HTML', instructor: 'Menna' },
                       { name: 'ES.NXT', instructor: 'Mohammed' },
                       { name: 'NoSQL', instructor: 'Ahmed' },
                       { name: 'OOP', instructor: 'Bola' },
                       { name: 'DataBase', instructor: 'Ramy' }
                     ])

// 5 – Update your document in “learners” collection by adding a new field as an array type field filled with your grades.
// ex: [50, 70 , ....]
db.learners.updateOne({ name: 'somaya' }, { $set: { grades: [100, 90, 90] } })

// 6 – Update your document in “learners” collection by adding new field as an embedded document type field filled your address.
// ex: { city: “Cairo”, street: “Makram Obied”, ... }
db.learners.updateOne({ name: 'somaya' }, { $set: { address: { city: 'Ismailia', street: 'Shebeen' } } })

// 7 – Update all the documents in “courses” collection by adding a new field called “grade” with a value of 100.
db.courses.updateMany({}, { $set: { grade: 100 } })

/********* */
// 8 – Update first document on “courses” collection, make its’ grade to be higher by 20% of others’ courses grade.
// // Hint: this is a little bit tricky, it maybe takes two steps ;)
db.courses.updateOne({}, { $mul: { grade: 1.2 } })

// 9 - Update your grades field on “learners” collection, make the first grade equals 20.
db.learners.updateOne({ name: 'somaya', grades: 100 }, { $set: { 'grades.$': 20 } })

// 10 - Update your address field on “learners” collection and make the city to be “Ismailia”. 
db.learners.updateOne({ name: 'somaya' }, { $set: { 'address.city': 'Ismailia' } })

// 11 - Delete all the courses that have grades equals to 100 from “courses” collection.
db.courses.deleteMany({ grade: { $eq: 100 } })

// 12 - Delete the course that has a grade of 90.
db.courses.deleteOne({ grade: { $eq: 90 } })

// 13 - Drop “learners” collection from “iti” database.
db.learners.drop()

// 14 - Drop “iti” database.
db.dropDatabase()

/*******************************************************************************************************************/
// 15 - Create a new database name it “random” and insert all the documents in “Persons.json” file in “Day1” folder 
// in a collection called “persons”.
// // You can search about how to import JSON file on the mongoDB database, Do it and you will get a bonus! ;)
use random
db.createCollection('Persons')
//*I did it with the MongoDB compass GUI, from the collection -> add data -> specify json type and the path****


// 16 - Find all the documents in “persons” collection, show all the data at once and print it in a pretty format.
// Hint: Force the data to show with skipping cursor object.
db.Persons.find({}).pretty()

// 17 - Find all the data and show only the fields (name, gender, and age) in “persons” collection.
db.Persons.find({}, { _id: 0, name: 1, gender: 1, age: 1 })

// 18 - Find the first two persons that have “brown” eye color only in “persons” collection.
db.Persons.find({ eyeColor: 'brown' }).limit(3)

// 19 - Count the number of persons that has age larger than 30 in “persons” collection.
db.Persons.find({ age: { $gt: 30 } }).count()

// 20 - Find the oldest two persons in “persons” collection.
db.getCollection('Persons').find({}).sort({ age: -1 }).limit(2)

// 21 - Find all persons that don’t have an eye color of brown or blue.
db.Persons.find({ eyeColor: { $nin: ['brown', 'blue'] } })

// 22 - Find all persons that have a favorite fruit of apple and strawberry. 
db.Persons.find({ favoriteFruit: { $in: ['apple', 'strawberry'] } })
db.Persons.find({ $or: [{ favoriteFruit: 'apple' }, { favoriteFruit: 'strawberry' }] })

//Let’s have a great bonus! Solve those 2 problems and get a bonus for each, It depends only on your search abilities!
// 1 - Push a new value called “bonus” in tags array for the persons that have ages between 20 and 30 years.
db.Persons.updateMany({ $and: [{ age: { $gt: 20 } }, { age: { $lt: 30 } }] }, { $push: { tags: 'bonus' } })

// 2 - Increment the age of all active persons except “Aurelia Gonzales” by one. 
db.Persons.updateMany({ name: { $nin: ['Aurelia Gonzales'] } }, { $inc: { age: 1 } }) 