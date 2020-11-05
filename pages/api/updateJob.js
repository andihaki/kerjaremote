import { table, getMinifyRecord } from "./utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;
  
  try {
    const updatedJobList = await table.update([{
      id,
      fields
    }]);
    const firstItem = updatedJobList[0];

    res.statusCode = 200;
    res.json(getMinifyRecord(firstItem));
    
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Tunggu akan kami bereskan'})
  }

}
