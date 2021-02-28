import { MongoClient, Db } from 'mongodb';
import { NowRequest, NowResponse } from '@vercel/node';
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const clienteDb = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);
  const db = clienteDb.db(dbName);
  cachedDb = db;

  return db;
}

export default async (req: NowRequest, res: NowResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('users');

  const top10 = await collection.find({ email: { $exists: true } })
    .limit(10).toArray();

  return res.json(top10);
};
