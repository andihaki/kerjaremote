import React, { useState } from "react";

import { useRouter } from 'next/router'
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import auth0 from '../api/utils/auth0';

export default function Profile({ auth, currentUser, connected_user }) {
  // console.log({ auth, currentUser });
  console.log(connected_user)
  console.log(currentUser)
  console.log('@@@ connect user')

  const router = useRouter()
  const { user_id } = router.query;

  const findUser = connected_user?.findIndex(item => item.following.user_id === currentUser?.user?.sub)
  const friends = connected_user?.length;
  const [isConnect, setIsConnect] = useState(findUser >= 0 ? true : false);

  const username = auth?.user?.nickname || auth?.user?.name || 'N.A';
  const avatar = auth?.user?.picture
  const isLogin = auth?.user?.nickname;
  const isRecruiter = auth?.user?.nickname?.includes('recruit') || auth?.user?.username?.includes('recruit')|| auth?.user?.username?.includes('name');

  /**
   * isConnect
   */


  const handleClickConnect = (evt) => {
    // https://stackoverflow.com/questions/54147290/nextjs-form-data-isnt-sent-to-the-express-server/54148262
    evt.preventDefault();
    // return console.log(evt.target)

    if (isConnect) return;
    
    //making a post request with the fetch API
    return fetch('/api/db/connect-user', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
           user: auth?.user,
           currentUser: currentUser?.user,
         })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
      .finally(() => {
        setIsConnect(true)
      })
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
                      <img
                        alt="..."
                        src={avatar}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className={`${isConnect ? 'bg-green-500 hover:bg-green-700 ' : 'bg-gray-800 active:bg-gray-700 '} uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150`}
                        type="button"
                        onClick={handleClickConnect}
                      >
                        {isConnect ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {friends}
                        </span>
                        <span className="text-sm text-gray-500">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          0
                        </span>
                        <span className="text-sm text-gray-500">Photos</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          0
                        </span>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2 capitalize">
                    {username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-blue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
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
  
  // searched user
  const { user_id } = context.query;
  const res = await fetch(`https://kodebaik.auth0.com/api/v2/users/${user_id}`, {
    method: 'GET',
    headers: {
      authorization:
        `Bearer ${process.env.AUTH0_TOKEN}`
    }
  });
  const user = await res.json();

  // connected user
  const res_connected_user = await fetch(`${process.env.HOSTNAME}/api/db/connected-user`, {
    method: 'POST',
    body: {
      keyword: user_id,
    },
    headers: {
      authorization:
        `Bearer ${process.env.AUTH0_TOKEN}`
    }
  });
  const connected_user = await res_connected_user.json();
  // console.log({ connected_user })
  

  try {  
    return {
      props: {
        auth: {
          user,
        },
        currentUser: session,
        connected_user,
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