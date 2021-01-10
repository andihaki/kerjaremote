import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const keywords = JSON.parse(req?.body?.keyword?.keyword || req?.body || {});
  const { keyword } = keywords;
  // console.log('aaa', keyword);
  // console.log('aaa', JSON.stringify(keyword));
  // Select the "Job List" collection from the database
  const collection = await req.db.collection('user_profile');

  // Select the users collection from the database
  // const data = await collection.find({ name_nickname_id: { $regex: `.*${keyword}*.` }}).toArray()

  const data = await collection.findOne({ name_nickname_id: { $regex: keyword } });

  // console.log({ data, keyword });

  // Respond with a JSON string of all users in the collection
  res.status(200).json(data || {});
  // res.status(200).json(data);
});

export default handler;
