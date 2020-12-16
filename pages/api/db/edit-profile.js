import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

// insert data
handler.post(async (req, res) => {
  let data = req.body;
  
  console.log(data)

  // data.date = new Date(data.date);

  // let doc = await req.db.collection('user_profile').insertOne(data)
  // let doc = await req.db.collection('user_profile').update({id: data.name_nickname_id}, {$set:data}, {upsert: false})
  let doc = await req.db.collection('user_profile').updateOne({name_nickname_id: data.name_nickname_id}, {$set:data}, {upsert: false})
  
  console.log(doc.result)
  res.json({message: 'ok', data});

})

export default handler;