import { table, getMinifyRecord } from "./utils/Airtable";

export default async (req, res) => {
  const { id } = req.body;
  
  try {
    const deleteJOb = await table.destroy([
      id
    ]);

    res.statusCode = 200;
    res.json(getMinifyRecord(deleteJOb));
    
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Tunggu akan kami bereskan'})
  }

}
