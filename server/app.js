const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
const port = process.env.port || 5000;

// Connection url or address
const url = 'mongodb://localhost:27017';
// Database name
const dbName = 'express_mongodb';

// Server connection using method connect
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    /*insertDocuments(db, () => {
        client.close();
    });*/
    /*findDocumentsQueryFilter(db, () => {
        client.close();
    })*/

    findDocuments(db, () => {
        client.close();
    });
    /*updateDocument(db, () => {
        client.close();
    });*/
    /*removeDocument(db, () => {
        client.close();
    });*/
    /*indexCollection(db, () => {
        client.close();
    });*/


});

// Insert Document
const insertDocuments = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('expressCollection');

    // Insert some documents
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

// Find All Documents
const findDocuments = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('expressCollection');

    // Find some documents
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

// Find Documents with a Query Filter
const findDocumentsQueryFilter = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('expressCollection');

    // Find some documents
    collection.find({ 'a': 3 }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

// Update a document
const updateDocument = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('expressCollection');

    // Update document where a is 2, set b equal to 1

    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
};

// Remove a document
const removeDocument = function(db, callback) {

    // Get the document collection
    const collection = db.collection('expressCollection');

    // Delete document where a is 
    collection.deleteOne({ a: 3 }, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
};

// Index a Collection
const indexCollection = function(db, callback) {

    // 
    db.collection('expressCollection').createIndex({ "a": 1 },
        null,
        (err, results) => {
            console.log(results);
            callback();
        });
};




// Get request
app.get('/', (req, res) => {
    res.send('Express is working');
});
// Post request
app.post('/', (req, res) => {
    res.send('Post request to the homepage');
});
// All request for /secret rout
/*app.all('/secret', (req, res) => {
    console.log('Accesing the secret section ...');
    res.send('Secret http request handle')
});*/

app.get('/users', (req, res) => {
    res.send(req.params + "  " + req.path);

});

// Listening to port
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});