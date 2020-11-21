import { table } from "./utils/Airtable";

export default async (req, res) => {
  const { companyName } = req.body;
  
  try {
    const createdJobList = await table.create([{
      fields: {
        companyName
      }
    }])
    const createdJob = {
      id: createdJobList[0].id,
      fields: createdJobList[0].fields,
    }
  
    res.statusCode = 200
    res.json(createdJobList)
    
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Tunggu akan kami bereskan'})
  }

}
