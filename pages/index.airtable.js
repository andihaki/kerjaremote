import { Fragment, useContext, useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { JobContext } from '../context/JobContext'
import { minifyRecordList, table } from './api/z_unused/utils/Airtable'
import auth0 from './api/utils/auth0'

export default function Home({ initJobList, user }) {
  const { jobList, setJobList } = useContext(JobContext);
  useEffect(() => {
    setJobList(initJobList)
  }, []);

  console.log(jobList)

  return (
    <div>
      <Head>
        <title>Kerja Remote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto my-10 max-w-xl">
        <h1 className="text-2xl text-center mb-4">List Pekerjaan</h1>
        {jobList.map((job, index) => {
          const { fields: { companyIcon, companyName, jobDescription, jobTitle, applyUrl } } = job;
          return (
            <div key={index} className="p-4 pt-4 mb-8 rounded overflow-hidden shadow-lg">
              <div className="flex items-center">
                <img src={companyIcon} alt={companyName} className="p-2 w-16 h-16 rounded-full mr-4" />
                <div>
                  <div>{jobTitle}</div>
                  <div>{companyName}</div>
                </div>
              </div>
              <ReactMarkdown source={jobDescription} />
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => applyUrl && window.open(applyUrl, '_blank')}>
                {applyUrl ? 'Apply' : 'Closed'}
              </button>
            </div>
          )
        })}
      </main>
    </div>
  )
}

/**
 * GetStaticProps, only run at build time. but because using 
 * @param {context} context 
 */
export async function getStaticProps(context) {
  const session = {};

  try {
    const initJobList = await table.select({}).firstPage();
  
    return {
      props: {
        initJobList: minifyRecordList(initJobList),
        user: session?.user || null,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
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