import {
  Fragment, useState,
} from 'react';
import Router from 'next/router';
import Head from 'next/head';

import { object } from 'prop-types';
import Navbar from 'components/Navbars/AuthNavbar';
import auth0 from './api/utils/auth0';

export default function PostJob({ auth }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const isLogin = auth?.user?.nickname;
  const username = auth?.user?.nickname || auth?.user?.name;

  const isRecruiter = auth?.user?.nickname?.includes('recruit') || auth?.user?.username?.includes('recruit') || auth?.user?.username?.includes('name');

  const handleSubmit = (evt) => {
    // https://stackoverflow.com/questions/54147290/nextjs-form-data-isnt-sent-to-the-express-server/54148262
    evt.preventDefault();
    // return console.log(evt.target)

    // making a post request with the fetch API
    return fetch('/api/db/post-job', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobTitle,
        jobDescription,
        url,
        companyName,
        logo,
        category,
        username,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsSubmit(true);
        Router.push('/job-list');
      });
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
                    {isRecruiter ? 'Posting Pekerjaan' : 'Anda tidak berhak mengakses halaman ini'}
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

        {isRecruiter && (
          <>

            <form className="pt-8" method="post" onSubmit={handleSubmit} id="form">
              <div>
                <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                  Nama Pekerjaan
                </label>
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="programmer"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                  Deskripsi Pekerjaan
                </label>
                <div className="mt-1 mb-1">
                  <textarea
                    id="jobDesc"
                    name="jobDesc"
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="penjelasan singkat mengenai deskripsi pekerjaan"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                Link untuk Apply
              </label>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="https://perusahaan.com/link-untuk-apply"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                Link Logo Perusahaan
              </label>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="https://perusahaan.com/logo.jpg"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </div>

              <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                Nama Perusahaan
              </label>
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Nama Perusahaan"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori Pekerjaan</label>
                <input
                  type="text"
                  placeholder="software engineer"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmit}
                  className={`${isSubmit ? 'disabled:opacity-50 bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'}  text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setIsSubmit(true)}
                >
                  {isSubmit ? 'Loading...' : 'Submit'}
                </button>
              </div>

            </form>
          </>
        )}

      </main>
    </div>
  );
}

PostJob.propTypes = {
  auth: object,
};

PostJob.defaultProps = {
  auth: {},
};

export async function getServerSideProps(context) {
  const session = await auth0?.getSession(context.req);

  try {
    return {
      props: {
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
