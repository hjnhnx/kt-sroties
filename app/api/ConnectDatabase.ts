import { MongoClient } from 'mongodb';

async function connectToDatabase() {
    const uri = 'mongodb+srv://keera4953:asdf1234@kt-stories.goykk6s.mongodb.net/';

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('kt-stories');
        return database;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

export default connectToDatabase;
