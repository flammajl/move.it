import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (req: NowRequest, res: NowResponse) => {
  const {
    name, email, image, level, challengesCompleted, currentExperience,
  } = req.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('users');

  const userCreated = await collection.findOne({ email });

  if (userCreated) return res.status(200).json({ ok: 'user already created' });

  try {
    await collection.insertOne({
      name, email, image, level, challengesCompleted, currentExperience,
    });

    return res.status(201).json({ ok: 'user created' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
