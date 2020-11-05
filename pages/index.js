import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { JobContext } from '../context/JobContext'
import { minifyRecordList, table } from './api/utils/Airtable'

export default function Home({ initJobList }) {
  const { jobList, setJobList } = useContext(JobContext);

  useEffect(() => {
    setJobList(initJobList)
  }, []);

  return (
    <div>
      <Head>
        <title>Kerja Remote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <h1 className="text-2xl text-center mb-4">Kerja Remote</h1>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const initJobList = await table.select({}).firstPage();
  
    return {
      props: {
        initJobList: minifyRecordList(initJobList)
      }
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Ada kesalahan, biar kami bereskan"
      }
    }
  }
}