const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Arcade'; // Database name
const collectionName = 'Games'; // Collection name

async function insertManyDocuments() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Array of documents to be inserted
    const documents = [
      {
        title: 'New Game 1',
        genre: 'Adventure',
        platform: 'Console',
        releaseYear: 2022,
        developer: 'Game Studio A',
        rating: 4.9
      },
      {
        title: 'New Game 2',
        genre: 'Strategy',
        platform: 'PC',
        releaseYear: 2023,
        developer: 'Game Studio B',
        rating: 4.7
      }
      // Add more documents as needed
    ];

    // Insert the array of documents into the collection
    const result = await collection.insertMany(documents);
    console.log('Documents inserted successfully:', result.insertedCount);
  } catch (error) {
    console.error('Error inserting documents:', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Call the function to insert multiple documents
insertManyDocuments();
