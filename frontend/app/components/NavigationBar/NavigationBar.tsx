'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfilePic from '../../images/ProfilePicture.jpg';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LandingPageNavBar = (props: any) => {
  const router = useRouter();
  const { isAuthenticated } = props;
  const href = isAuthenticated ? '/dashboard' : '/';

  return (
    <div className="navbar max-w-5xl bg-base-100 mx-auto">
      <div className="flex-1">
        <Link href={href} className="btn btn-ghost normal-case text-2xl">
          Leetcode Racer
        </Link>
      </div>
      {isAuthenticated ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image src={ProfilePic} alt="ProfilePicture" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    router.push('/questions');
                  }}
                >
                  Manage Questions
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('email');
                    localStorage.removeItem('role');
                    toast.success('Logout successful');
                    router.push('/');
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LandingPageNavBar;
