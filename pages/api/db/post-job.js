import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const defaultData = {
  jobTitle: "Nama Pekerjaan",
  jobDescription: "Deskripsi Pekerjaan",
  url: "https://jobs.lever.co/gitbook/674bc55f-584d-4db4-be9f-92f2122e7e4c",
  companyName: "Nama Perusahaan",
  logo: "https://picsum.photos/seed/picsum/100/100",
  category: "Software Engineer",
  region: "Indonesia",
};

// insert data
handler.post(async (req, res) => {
  let data = req.body;
  

  data = {
    jobTitle: data.jobTitle || defaultData.jobDescription,
    jobDescription: data.jobDescription || defaultData.jobDescription,
    url: data.url || defaultData.url,
    companyName: data.companyName || defaultData.companyName,
    logo: data.logo || defaultData.logo,
    category: data.category || defaultData.category,
    region: data.region || defaultData.region,
    username: data.username || 'N.A'
  }
  // console.log({ data })

  // data.date = new Date(data.date);

  let doc = await req.db.collection('job_list').insertOne(data)
  // let doc = await req.db.collection('job_list').updateOne({}, {$set:data}, {upsert: false})

  res.json({message: 'ok'});

})

export default handler;