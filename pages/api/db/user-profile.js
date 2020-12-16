import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const keyword = req?.body || req?.body?.username || 'xxx';
  // console.log('aa', JSON.stringify(req, undefined, 2))
  // console.log({ keyword })
  // Select the "Job List" collection from the database
  const collection = await req.db.collection('user_profile')

  // Select the users collection from the database
  // const data = await collection.find({ name_nickname_id: { $regex: `.*${keyword}*.` }}).toArray()
  
  const data = await collection.findOne({ name_nickname_id: { $regex: `.*${keyword}*.` }})
  // const data = await collection.findOne({ name_nickname_id: { $regex: `.*test@gmail.com*.` }})

  console.log({ data, keyword });

  // Respond with a JSON string of all users in the collection
  // res.status(200).json(data ? data : {})
  res.status(200).json(data)

  
});

export default handler;