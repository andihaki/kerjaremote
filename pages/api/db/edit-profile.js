import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

// insert data
handler.post(async (req, res) => {
  const data = req.body;

  // console.log('edit-profile', data);

  // data.date = new Date(data.date);

  // const doc = await req.db.collection('user_profile').insertOne(data);
  // const doc = await req.db.collection('user_profile').update({ id: data.name_nickname_id }, { $set: data }, { upsert: false });
  // const doc = await req.db.collection('user_profile').updateOne({ name_nickname_id: data.name_nickname_id }, { $set: data }, { upsert: false });
  const doc = await req.db.collection('user_profile').updateOne({ name_nickname_id: data.name_nickname_id }, { $set: data }, { upsert: true });

  // console.log('edit-profile', doc.result);
  res.json({ message: 'ok', doc });
});

export default handler;
