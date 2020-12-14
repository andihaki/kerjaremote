import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const keyword = req?.data?.keyword || 'xxx';
  // Select the "Job List" collection from the database
  const collection = await req.db.collection('my_networks_friends')

  // Select the users collection from the database
  const data = await collection.find({ name_nickname_id: { $regex: `.*${keyword}*.`" }}).toArray()

  // Respond with a JSON string of all users in the collection
  res.status(200).json(data)
});

// insert data
handler.post(async (req, res) => {
  let data = req.body;
  const user = data.user;
  const currentUser = data.currentUser
  
  data = {
    name_nickname_id: `${currentUser.name}_${currentUser.nickname}_${currentUser.sub}`,
    following: user,
  }
  // console.log({ data })
  
  // data.date = new Date(data.date);

  let doc = await req.db.collection('my_networks_friends').insertOne(data)
  // let doc = await req.db.collection('my_networks_friends').updateOne({}, {$set:data}, {upsert: true})

  res.json({message: 'ok'});

})

export default handler;