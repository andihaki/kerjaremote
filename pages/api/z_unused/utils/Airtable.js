import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifyRecord = record => {
  return {
    id: record.id,
    fields: record.fields,
  }
}

const minifyRecordList = records => {
  return records.map(record => getMinifyRecord(record));
}

export { table, getMinifyRecord, minifyRecordList };