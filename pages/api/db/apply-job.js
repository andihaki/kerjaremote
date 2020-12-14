import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

// insert data
handler.post(async (req, res) => {
  let data = req.body;
  

  data = {
    jobTitle: data.jobTitle,
    jobDescription: data.jobDescription,
    url: data.url,
    companyName: data.companyName,
    logo: data.logo,
    category: data.category,
    region: data.region,
    username: data.username,
  }
  // console.log({ data })

  // data.date = new Date(data.date);

  let doc = await req.db.collection('applied_jobs').insertOne(data)
  // let doc = await req.db.collection('job_list').updateOne({}, {$set:data}, {upsert: false})

  res.json({message: 'ok'});

})

export default handler;