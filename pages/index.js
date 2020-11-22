import { Fragment, useContext, useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { JobContext } from '../context/JobContext'

export default function Home({ initJobList, user }) {
  const { jobList, setJobList } = useContext(JobContext);
  const [jobs, setJobs] = useState([])

  // console.log(jobList, initJobList)
  useEffect(() => {
    setJobs(initJobList || jobList)
  })

  return (
    <div>
      <Head>
        <title>Kerja Remote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto my-10 max-w-xl">
        <h1 className="text-2xl text-center mb-4">List Pekerjaan</h1>
        {jobs.map((job, index) => {
          const { logo, companyName, jobDescription, jobTitle, url } = job;
          return (
            <div key={index} className="p-4 pt-4 mb-8 rounded overflow-hidden shadow-lg">
              <div className="flex items-center">
                <img src={logo} alt={companyName} className="p-2 w-16 h-16 rounded-full mr-4" />
                <div>
                  <div>{jobTitle}</div>
                  <div>{companyName}</div>
                </div>
              </div>
              <ReactMarkdown source={jobDescription} />
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => url && window.open(url, '_blank')}>
                {url ? 'Apply' : 'Closed'}
              </button>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const initJobList =  [];
    const res = await fetch(`${process.env.HOSTNAME}/api/job-list`);
    const latestJobList = await res.json();
    console.log(latestJobList)
  
    return {
      props: {
        initJobList: latestJobList || initJobList,
      },
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