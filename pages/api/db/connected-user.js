import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const keyword = req?.body || 'xxx';
  // console.log({ keyword })
  // Select the "Job List" collection from the database
  const collection = await req.db.collection('my_networks_friends')

  // Select the users collection from the database
  const data = await collection.find({ name_nickname_id: { $regex: `.*${keyword}*.` }}).toArray()

  // Respond with a JSON string of all users in the collection
  res.status(200).json(data)
});

export default handler;