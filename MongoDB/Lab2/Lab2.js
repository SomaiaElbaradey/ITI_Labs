// 1 - Find all female persons.
db.Persons.aggregate([{ $match: { gender: "female" } }])

// 2 – Count all active users. Use isActive field on the documents.
db.Persons.aggregate([
    { $match: { isActive: true } },
    { $count: 'isActiveCount' }
])

// 3 – Group all persons by their gender and get the maximum age in each gender.
db.Persons.aggregate([
    { $group: { _id: "$gender", maxAge: { $max: "$age" } } }
])

// 4 - Group all persons by their ages and sum the number of persons at every certain age.
// // Hint: the output should be something like that:
// {“_id:”: 27, “count”: 38} where 27 is a certain age and 38 are number of persons that have that age
db.Persons.aggregate([
    { $group: { _id: "$age", count: { $sum: 1 } } }
])

// 5 - Find average age of males and group them by their company country location.
db.Persons.aggregate([
    { $match: { gender: 'male' } },
    { $group: { _id: "$company.location.country", avgAge: { $avg: '$age' } } }
])

// 6 - Find the youngest male.
db.Persons.aggregate([
    { $match: { gender: 'male' } },
    { $sort: { age: 1 } },
    { $limit: 1 }
])

// 7 - Find the oldest active female.
db.Persons.aggregate([
    { $match: { gender: 'female' } },
    { $match: { isActive: true } },
    { $sort: { age: -1 } },
    { $limit: 1 }
])

// 8 - Group all persons by the tag name ‘excepteur’ and sum their ages.
db.Persons.aggregate([
    { $group: { _id: { tages: ['excepteur'] }, sumOfAges: { $sum: '$age' } } },
])

// 9 - Find all active females persons and group them by their favorite fruit and sum number of females that love
// each fruit finally export the result on another collection call it “femalesFavouriteFruit”.
// // search about the operator that we use to do this ;)
db.Persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: '$favoriteFruit', count: { $sum: 1 } } },
    { $out: { db: 'random', coll: 'femalesFavouriteFruit' } }
])

// - Indexes Problems
// 10 - Get all indexes on the persons collection on “random” database.
db.Persons.getIndexes()

// 11 - Find all the persons on “persons” collection on “random” database that has age larger than 25 and run
// explain method using ‘executionStats’ parameter and note the number of scanned documents.
db.Persons.find({ age: { $gt: 25 } }).explain('executionStats')
/*
0.02 sec
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "random.Persons",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "age" : {
                "$gt" : 25.0
            }
        },
        "winningPlan" : {
            "stage" : "COLLSCAN",                   <-----------
            "filter" : {
                "age" : {
                    "$gt" : 25.0
                }
            },
            "direction" : "forward"
        },
        "rejectedPlans" : []
    },
    "executionStats" : {
        "executionSuccess" : true,
        "nReturned" : 742,
        "executionTimeMillis" : 0,
        "totalKeysExamined" : 0,
        "totalDocsExamined" : 1000,
        "executionStages" : {
            "stage" : "COLLSCAN",
            "filter" : {
                "age" : {
                    "$gt" : 25.0
                }
            },
            "nReturned" : 742,
            "executionTimeMillisEstimate" : 0,
            "works" : 1002,
            "advanced" : 742,
            "needTime" : 259,
            "needYield" : 0,
            "saveState" : 1,
            "restoreState" : 1,
            "isEOF" : 1,
            "direction" : "forward",
            "docsExamined" : 1000
        }
    },
    "serverInfo" : {
        "host" : "DESKTOP-AUCF57G",
        "port" : 27017,
        "version" : "4.4.3",
        "gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
    },
    "ok" : 1.0
}
*/

// 12 - Create an index (ascending) using age field in “persons” collection on “random” database.
db.Persons.createIndex(
    { age: 1 },
    { background: true, name: "ageIndex" }
)


// 13 - Repeat question number 10 and compare the stats before and after creation of age index.
db.Persons.find({ age: { $gt: 25 } }).explain('executionStats')
/*
0.019 sec
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "random.Persons",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "age" : {
                "$gt" : 25.0
            }
        },
        "winningPlan" : {
            "stage" : "FETCH",
            "inputStage" : {
                "stage" : "IXSCAN",                     <-----------
                "keyPattern" : {
                    "age" : 1.0
                },
                "indexName" : "ageIndex",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "age" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "age" : [ 
                        "(25.0, inf.0]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "executionStats" : {
        "executionSuccess" : true,
        "nReturned" : 742,
        "executionTimeMillis" : 18,
        "totalKeysExamined" : 742,
        "totalDocsExamined" : 742,
        "executionStages" : {
            "stage" : "FETCH",
            "nReturned" : 742,
            "executionTimeMillisEstimate" : 10,
            "works" : 743,
            "advanced" : 742,
            "needTime" : 0,
            "needYield" : 0,
            "saveState" : 0,
            "restoreState" : 0,
            "isEOF" : 1,
            "docsExamined" : 742,
            "alreadyHasObj" : 0,
            "inputStage" : {
                "stage" : "IXSCAN",
                "nReturned" : 742,
                "executionTimeMillisEstimate" : 10,
                "works" : 743,
                "advanced" : 742,
                "needTime" : 0,
                "needYield" : 0,
                "saveState" : 0,
                "restoreState" : 0,
                "isEOF" : 1,
                "keyPattern" : {
                    "age" : 1.0
                },
                "indexName" : "ageIndex",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "age" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "age" : [ 
                        "(25.0, inf.0]"
                    ]
                },
                "keysExamined" : 742,
                "seeks" : 1,
                "dupsTested" : 0,
                "dupsDropped" : 0
            }
        }
    },
    "serverInfo" : {
        "host" : "DESKTOP-AUCF57G",
        "port" : 27017,
        "version" : "4.4.3",
        "gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
    },
    "ok" : 1.0
}
*/
// 14 - Create a unique index (ascending) using “index” field on persons documents in “persons” collection.
db.Persons.createIndex(
    { index: 1 },
    { background: true, name: 'uniqueIndex', unique: true }
)

// 15 - Delete all the indexes on persons collection.
db.Persons.dropIndexes()