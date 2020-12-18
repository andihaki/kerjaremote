import {
  useContext, useEffect, useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import { arrayOf, object } from 'prop-types';
import Router from 'next/router';

import Navbar from '../components/Navbars/AuthNavbar';
import { JobContext } from '../context/JobContext';
import auth0 from './api/utils/auth0';

export default function Home({ initJobList, auth }) {
  const { jobList } = useContext(JobContext);
  const [jobs, setJobs] = useState(jobList);

  const isLogin = auth?.user?.nickname;
  const isRecruiter = auth?.user?.nickname?.includes('recruit') || auth?.user?.username?.includes('recruit') || auth?.user?.username?.includes('name');
  const username = auth?.user?.nickname || auth?.user?.name;

  console.log({
    jobList, initJobList, hostname: process.env.HOSTNAME, auth,
  });

  useEffect(() => {
    setJobs(initJobList?.length ? initJobList : jobList);
  }, [initJobList, jobList]);

  const handleSubmit = (evt, job) => {
    // https://stackoverflow.com/questions/54147290/nextjs-form-data-isnt-sent-to-the-express-server/54148262
    evt.preventDefault();
    // return console.log(evt.target)

    // making a post request with the fetch API
    return fetch('/api/db/apply-job', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...job,
        username,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => {
        if (job.url) {
          window.open(job.url, '_blank');
        } else {
          Router.push('/');
        }
      });
  };

  const renderButton = (url, job) => {
    if (!isLogin) {
      return (
        <a
          href="/api/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login to Apply
        </a>
      );
    }
    return (
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleSubmit(e, job)}>
        {url ? 'Apply' : 'Closed'}
      </button>
    );
  };

  return (
    <div>
      <Head>
        <title>Kerja Remote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isLogin={isLogin} isRecruiter={isRecruiter} />

      <main className="container mx-auto my-10 max-w-xl">
        {/* <main> */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            />
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Pekerjaan Remote
                  </h1>

                  <p className="mt-4 text-lg text-gray-300" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>

        {jobs.map((job, index) => {
          const {
            logo, companyName, jobDescription, jobTitle, url,
          } = job;
          return (
            <div key={index} className="p-4 pt-4 mb-8 rounded overflow-hidden shadow-lg" data-testid={`job-item-${index + 1}`}>
              <div className="flex items-center">
                <img src={logo} alt={companyName} className="p-2 w-16 h-16 rounded-full mr-4" />
                <div>
                  <div>{jobTitle}</div>
                  <div>{companyName}</div>
                </div>
              </div>
              <div className="mb-4">
                <ReactMarkdown source={jobDescription} />
              </div>
              {renderButton(url, job)}
            </div>
          );
        })}
      </main>
    </div>
  );
}

Home.propTypes = {
  initJobList: arrayOf(object),
  user: object,
  auth: object,
};

Home.defaultProps = {
  initJobList: [],
  user: {},
  auth: {},
};

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);

  try {
    const initJobList = [];
    const res = await fetch(`${process.env.HOSTNAME}/api/job-list`);
    const latestJobList = await res.json();
    // console.log({latestJobList})

    return {
      props: {
        initJobList: latestJobList || initJobList,
        auth: session,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'Ada kesalahan, biar kami bereskan',
      },
    };
  }
}
