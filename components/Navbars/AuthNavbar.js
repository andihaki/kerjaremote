import React from 'react';
import Link from 'next/link';
import {
  bool, oneOfType, string,
} from 'prop-types';
// components

// import PagesDropdown from 'components/Dropdowns/PagesDropdown';

export default function Navbar({ isLogin, isRecruiter }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="#pablo"
              >
                KERJA REMOTE
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars" />
            </button>
          </div>
          <div
            className={
              `lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none${
                navbarOpen ? ' block rounded shadow-lg' : ' hidden'}`
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link href="/job-list" className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <a
                    href="/job-list"
                    className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  >
                    <i className="lg:text-gray-300 text-gray-500 far fa-file-alt text-lg leading-lg mr-2" />
                    {' '}
                    List Pekerjaan
                  </a>
                </Link>
              </li>
              {isRecruiter ? (
                <li className="flex items-center">
                  <Link href="/post-job" className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                    <a
                      href="/post-job"
                      className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      <i className="lg:text-gray-300 text-gray-500 far fa-paper-plane text-lg leading-lg mr-2" />
                      {' '}
                      Posting Pekerjaan Baru
                    </a>
                  </Link>
                </li>

              ) : ''}

              <li className="flex items-center">
                <Link href="/search-user" className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <a
                    href="/search-user"
                    className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  >
                    <i className="lg:text-gray-300 text-gray-500 fas fa-search text-lg leading-lg mr-2" />
                    {' '}
                    Cari User
                  </a>
                </Link>
              </li>

            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isLogin ? (
                <li className="flex items-center">
                  <Link href="/profile">
                    <a
                      href="/profile"
                      className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    >
                      <i className="lg:text-gray-300 text-gray-500 far fa-user text-lg leading-lg mr-2" />
                      {' '}
                      Profile
                    </a>
                  </Link>
                </li>
              ) : ''}
              <li className="flex items-center">
                <Link href={`/api/${isLogin ? 'logout' : 'login'}`}>
                  <a
                    href={`/api/${isLogin ? 'logout' : 'login'}`}
                    className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  >
                    <i className={`lg:text-gray-300 text-gray-500 ${isLogin ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'} text-lg leading-lg mr-2`} />
                    {' '}
                    {isLogin ? 'Logout' : 'Login'}
                  </a>
                </Link>
              </li>
              {/* <li className="flex items-center">
                <PagesDropdown />
              </li> */}
              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                  target="_blank"
                >
                  <i className="lg:text-gray-300 text-gray-500 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                  target="_blank"
                >
                  <i className="lg:text-gray-300 text-gray-500 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li> */}

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/andihaki/kerjaremote"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="lg:text-gray-300 text-gray-500 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li>

              {/* <li className="flex items-center">
                <button
                  className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = { isLogin: oneOfType([bool, string]), isRecruiter: bool };
Navbar.defaultProps = { isLogin: false, isRecruiter: false };
