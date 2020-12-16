import { Fragment, useContext, useEffect, useState } from 'react'
import Router from "next/router";
import Link from 'next/link'
import ReactMarkdown from "react-markdown";
import Head from 'next/head'
import Navbar from "components/Navbars/AuthNavbar.js";
import auth0 from '../api/utils/auth0';

export default function Edit({ auth, user_profile }) {

  console.log({ user_profile })

  const [name, setName] = useState(user_profile?.name); 
  const [profilePicture, setProfilePicture] = useState(user_profile?.profilePicture); 
  const [address, setAddress] = useState(user_profile?.address); 
  const [profileDescription, setProfileDescription] = useState(user_profile?.profileDescription); 
  const [jobTitle, setJobTitle] = useState(user_profile?.jobTitle); 
  const [companyName, setCompanyName] = useState(user_profile?.companyName); 
  const [university, setUniversity] = useState(user_profile?.university); 
  const [isSubmit, setIsSubmit] = useState(false);

  const isLogin = auth?.user?.nickname;
  const username = auth?.user?.nickname || auth?.user?.name;
  const user = auth?.user;

  const isRecruiter = auth?.user?.nickname?.includes('recruit') || auth?.user?.username?.includes('recruit')|| auth?.user?.username?.includes('name');
  
  const renderButton = (url) => {
    if (!isLogin) {
      return (
        <a
          href="/api/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Login to Apply
        </a>
      )
    }
    return (
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => url && window.open(url, '_blank')}>
        {url ? `Apply` : 'Closed'}
      </button>
    )
  }

  const handleSubmit = evt => {
    // https://stackoverflow.com/questions/54147290/nextjs-form-data-isnt-sent-to-the-express-server/54148262
    evt.preventDefault();
    // return console.log(evt.target)
    
    //making a post request with the fetch API
    return fetch('/api/db/edit-profile', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
           name,
           profilePicture,
           address,
           profileDescription,
           companyName,
           jobTitle,
           university,
           name_nickname_id: `${user.name}_${user.nickname}_${user.sub}`,
         })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
      .finally(() => {
        setIsSubmit(true)
        Router.push('/profile')
      })
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
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Edit Profile
                  </h1>

                  <p className="mt-4 text-lg text-gray-300">
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
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
              ></polygon>
            </svg>
          </div>
        </div>

          <>

            
          <form className="pt-8" method="post" onSubmit={handleSubmit} id="form">
            <div>
              <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mb-3 pt-0">
                <input type="text" placeholder="username" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                value={name}
                onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
            
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
              Link Profile Picture
            </label>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="https://abc.com/profilePicture.jpg" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={profilePicture}
              onChange={e => setProfilePicture(e.target.value)}
              />
            </div>
            
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Jakarta, Indonesia" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={address}
              onChange={e => setAddress(e.target.value)}
              />
            </div>
            
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
              Pekerjaan
            </label>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Software Engineer" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              />
            </div>
            
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
              Perusahaan
            </label>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Linkedin" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            
            <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
              Universitas
            </label>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Harvard" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={university}
              onChange={e => setUniversity(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="jobDesc" className="block text-sm font-medium text-gray-700">
                Deskripsi Profile
              </label>
              <div className="mt-1 mb-1">
                <textarea id="jobDesc" name="jobDesc" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="penjelasan singkat mengenai anda"
                value={profileDescription}
                onChange={e => setProfileDescription(e.target.value)}
                />
              </div>
            </div>

            <div  className="mt-4">
              <button 
              disabled={isSubmit}
              className={`${isSubmit ? 'disabled:opacity-50 bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'}  text-white font-bold py-2 px-4 rounded`} 
              onClick={() => setIsSubmit(true)}
              >{isSubmit ? 'Loading...' : 'Submit'}</button>
            </div>

          </form>
          </>
        
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  
  // user profile
  const username = session.user.name;
  const res_user_profile = await fetch(`${process.env.HOSTNAME}/api/db/user-profile`, {
    method: 'POST',
    body: {
      keyword: username,
      username,
    },
    headers: {
      authorization:
        `Bearer ${process.env.AUTH0_TOKEN}`
    }
  });
  const user_profile = await res_user_profile.json();
  console.log({ username, user_profile });
  
  try {
    return {
      props: {
        auth: session,
        user_profile,
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