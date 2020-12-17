import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  // let doc = await req.db.collection('job_list').findOne()
  // console.log(doc);
  // res.json(doc);

  // Select the "Job List" collection from the database
  const collection = await req.db.collection('job_list');

  // Select the users collection from the database
  const jobList = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json(jobList);
});

// // update data
// handler.post(async (req, res) => {
//   let data = '';// req.body;
//   data = {
//     jobTitle: "Product Engineer",
//     jobDescription: "Hi, I’m Dani, an entrepreneur, and a tech author & speaker.   We, at Flyp, just closed our investment round, and are growing our team. We’re looking to hire our first full-time backend engineer to be in charge of our REST API (Node.js). The engineer will be developing API for our existing mobile app and CMS, in addition to integrating services. We value attitude over skills. We’re looking for someone to treat this startup as their own, have opinions, be involved in decision making, have a hacker mindset, and be result-driven. Although we’re a remote-first startup, we make sure to have overlapping hours across the team to boost productivity.   Along with my business partner James, we’ve been on a mission to change the way people buy and sell online for over 8 years. We started Saily, the first app to buy & sell used stuff in 2012. We grew it to 500,000+ users before joining Mercari, the giant mobile marketplace. There we led Product & Growth and IPO’ed in 2018. Six months ago, we built Flyp, an app that connects small businesses to professional sellers who sell their clothing inventory for them. Pros handle pricing, listing, negotiating with buyers, packing and shipping each item, then splitting profits.     https://www.daniarnaout.com/",
//     url: "https://jobs.lever.co/gitbook/674bc55f-584d-4db4-be9f-92f2122e7e4c",
//     companyName: "Gitbook",
//     logo: "https://lever-client-logos.s3.amazonaws.com/bb3aad4b-7e0e-4248-8b27-8821bd7bd79e-1578311094105.png",
//     category: "Software Engineer",
//     region: "Europe",
//   };

//   // data = JSON.parse(data);
//   // console.log({ data });

//   // data.date = new Date(data.date);

//   let doc = await req.db.collection('job_list').updateOne({}, {$set:data}, {upsert: false})

//   res.json({message: 'ok'});
// })

// insert data
handler.post(async (req, res) => {
  let data = ''; // req.body;

  data = {
    jobTitle: 'xyz Product Engineer',
    jobDescription: 'xyz',
    url: 'https://jobs.lever.co/gitbook/674bc55f-584d-4db4-be9f-92f2122e7e4c',
    companyName: 'test',
    logo: 'https://lever-client-logos.s3.amazonaws.com/bb3aad4b-7e0e-4248-8b27-8821bd7bd79e-1578311094105.png',
    category: 'Software Engineer',
    region: 'Indonesia',
  };

  // data = JSON.parse(data);

  // data.date = new Date(data.date);

  const doc = await req.db.collection('job_list').insertOne(data);

  res.json({ message: doc ? 'ok' : 'oops' });
});

export default handler;
