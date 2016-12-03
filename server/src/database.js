// Your startup's initial mock objects go here
var initialData = {
  "games": [ //these games are obsolete, we pull from the steam api
    {
      "_id": 1,
      "title": "Fake Game 1",
      "beforePrice": "59.99",
      "currentPrice": "49.99",
      "futurePrice": "39.99",
      "steamLink": 1
    },
    {
      "_id": 2,
      "title": "Fake Game 2",
      "beforePrice": "9.99",
      "currentPrice": "7.99",
      "futurePrice": "5.99",
      "steamLink": 2
    },
    {
      "_id": 3,
      "title": "Fake Game 3",
      "beforePrice": "19.99",
      "currentPrice": "14.99",
      "futurePrice": "9.99",
      "steamLink": 3
    },
    {
      "_id": 4,
      "title": "Fake Game 4",
      "beforePrice": "14.99",
      "currentPrice": "9.99",
      "futurePrice": "4.99",
      "steamLink": 4
    },
    {
      "_id": 5,
      "title": "Fake Game 5",
      "beforePrice": "3.99",
      "currentPrice": "2.99",
      "futurePrice": "1.99",
      "steamLink": 5
    }
  ],
  // "boards": [
  //   {
  //     "title": "general",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "title": "favorite",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "title": "offtopic",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "title": "predictions",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "title": "price",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "title": "support",
  //     "topics": [
  //       {
  //         "title": "alpacas are smelly",
  //         "replies": [
  //           {
  //             "content": "i agree"
  //             "_id": 4
  //           }
  //         ]
  //       }
  //     ]
  //   },
  // ],
  "users":{
    "1":
      {
        "_id": 1,
        "userName": "Temp1",
        "bio": "Hi! My name is Temp1!",
        "eMail": "temp1@gmail.com",
        "steamAccount": "tempOne",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "2":
      {
        "_id": 2,
        "userName": "Temp2",
        "bio": "Hi! My name is Temp2!",
        "eMail": "temp2@gmail.com",
        "steamAccount": "tempTwo",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "3":
      {
        "_id": 3,
        "userName": "Temp3",
        "bio": "Hi! My name is Temp3!",
        "eMail": "temp3@gmail.com",
        "steamAccount": "tempThree",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "4":
      {
        "_id": 4,
        "userName": "Temp4",
        "bio": "Hi! My name is Temp4!",
        "eMail": "temp4@gmail.com",
        "steamAccount": "tempFour",
        "companyName": "Team123",
        "watchList": [311210, 504370]
      },
    "5":
      {
        "_id": 5,
        "userName": "Temp5",
        "bio": "Hi! My name is Temp5!",
        "eMail": "temp5@gmail.com",
        "steamAccount": "tempFive",
        "companyName": "Team123",
        "watchList": [1,2,3]
      }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;


function readEntireDocument(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
}
module.exports.readEntireDocument = readEntireDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
