import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

const connectToMongoDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri, options);
      await client.connect();
    }
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const disconnectFromMongoDB = async () => {
  try {
    if (client) {
      await client.close();
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

export { connectToMongoDB, disconnectFromMongoDB };
