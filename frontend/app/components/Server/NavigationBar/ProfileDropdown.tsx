import React from 'react';
import Image from 'next/image';
import ProfilePic from '../../../images/ProfilePicture.jpg';
import HomeButton from '../../Client/NavigationBar/HomeButton';
import ManageQuestionsButton from '../../Client/NavigationBar/ManageQuestionsButton';
import LogoutButton from '../../Client/NavigationBar/LogoutButton';

interface ProfileDropdownProps {
  isAuthenticated: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isAuthenticated,
}) => {
  return (
    <div className="navbar max-w-5xl mx-auto">
      <div className="flex-1">
        <HomeButton href={isAuthenticated ? '/dashboard' : '/'} />
      </div>
      {isAuthenticated ? (
        <div className="flex-none gap-2 ml-auto">
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
                <ManageQuestionsButton href={'/questions'} />
              </li>
              <li>
                <LogoutButton href={'/users/login'} />
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
