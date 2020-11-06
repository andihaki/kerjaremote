import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { JobContext } from '../context/JobContext'
import { minifyRecordList, table } from './api/utils/Airtable'
import auth0 from './api/utils/auth0'

export default function Home({ initJobList, user }) {
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
  const session = await auth0.getSession(context.req);

  try {
    const initJobList = await table.select({}).firstPage();
  
    return {
      props: {
        initJobList: minifyRecordList(initJobList),
        user: session?.user || null,
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