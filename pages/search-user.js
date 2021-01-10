import React, { useState } from "react";

import Link from 'next/link'
import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";

import auth0 from './api/utils/auth0';

export default function Profile({ auth }) {
  console.log({ auth });
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  const username = auth?.user?.name || auth?.user?.nickname || 'N.A';
  const avatar = auth?.user?.picture
  const isLogin = auth?.user?.nickname;
  const isRecruiter = auth?.user?.nickname?.includes('recruit') || auth?.user?.username?.includes('recruit')|| auth?.user?.username?.includes('name');

  const handleSubmit = evt => {
    // https://stackoverflow.com/questions/54147290/nextjs-form-data-isnt-sent-to-the-express-server/54148262
    evt.preventDefault();
    // console.log({ keyword })
    // return console.log(evt.target)
    
    //making a post request with the fetch API
    return fetch('/api/search-user', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
           keyword,
         })
      })
      .then(response => response.json())
      .then(data => {
        setResult(data)
        // return data;
      })
      .catch(error => console.log(error))
  };

  console.log({ result });

  const handleKeyPress = (e) => {
    e.persist();
    if (e.charCode === 13 || e.key === 'Enter') handleSubmit(e)
  }

  return (
    <>
      <Navbar transparent isLogin={isLogin} isRecruiter={isRecruiter} />
      <main className="profile-page">
        <section className="relative block h-500-px">

          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
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
        </section>
        <section className="relative py-16 bg-gray-300">
          
          <div className="container mx-auto px-4">

            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <h2>Cari User</h2>
                    </div>
                  </div>
                  
                </div>

                
                <div className="relative flex w-full p-4 flex-wrap items-stretch lg:ml-auto">
                  <div className="flex" onClick={handleSubmit}>
                    <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-gray-600 rounded-full text-sm bg-gray-100 items-center rounded-r-none pl-2 py-1 text-gray-800 border-r-0 placeholder-gray-300 px-2 mr-4">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <input type="text" className="px-2 py-1 h-8 border border-solid  border-gray-600 rounded-full text-sm leading-snug text-gray-700 bg-gray-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-gray-300"
                    placeholder="Cari User Lainnya"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyPress={e => handleKeyPress(e)}
                    />
                </div>

                <div>
                  {keyword?.length < 3 ? 'minimal 3 kata' : null}
                </div>
                <div>
                  {result?.error ? 'OOps, user tidak ditemukan, coba kata kunci lain' : null}
                </div>

                <div>
                  {result?.length ? result?.map((item, index) => {
                    const { client_id, nickname, user_id: userId, picture, email, name } = item
                    // console.log({ userId })
                    return (
                      <Link key={index} href={`/profile/${userId}`}
                        className="my-4 shadow-lg rounded leading-normal"
                      >
                        <div className="flex">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-6/12 sm:w-4/12 px-4 my-4">
                            <img src={picture} alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                          </div>
                        </div>

                        <div  className="my-4">
                          <p>Username: {nickname}</p>
                          <p>Name / Email: {name} / {email}</p>
                        </div>
                        </div>


                      </Link>
                    )
                  }) : null}
                </div>
      
            </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  
  try {  
    return {
      props: {
        auth: session
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