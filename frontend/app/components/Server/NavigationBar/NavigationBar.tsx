'use client';
import React from 'react';
import Image from 'next/image';
import ProfilePic from '../../../images/ProfilePicture.jpg';
import ProfileDropdown from './ProfileDropdown';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import HomeButton from '../../Client/NavigationBar/HomeButton';
import ManageQuestionsButton from '../../Client/NavigationBar/ManageQuestionsButton';
import LogoutButton from '../../Client/NavigationBar/LogoutButton';

interface NavigationBarProps {
  isAuthenticated: boolean;
}
const NavigationBar: React.FC<NavigationBarProps> = ({ isAuthenticated }) => {
  return (
    // <section className="text-whitebody-font">
    //   <div className="container mx-auto flex md:flex-row flex-col">
    //     <ProfileDropdown isAuthenticated={isAuthenticated} />
    //   </div>
    // </section>
    <Navbar>
      <NavbarBrand>
        <HomeButton href={isAuthenticated ? '/dashboard' : '/'} />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      {isAuthenticated ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {/*<Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                name="Jason Hughes"
                size="sm"
                src="../../../images/ProfilePicture.jpg"
              /> */}
              <label tabIndex={0} className="btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image src={ProfilePic} alt="ProfilePicture" />
                </div>
              </label>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {typeof window !== 'undefined' &&
                    localStorage?.getItem('email')}
                </p>
              </DropdownItem>
              {typeof window !== 'undefined' &&
              localStorage?.getItem('role') == 'maintainer' ? (
                <DropdownItem key="help_and_feedback">
                  <ManageQuestionsButton href={'/questions'} />
                </DropdownItem>
              ) : (
                <DropdownItem isDisabled></DropdownItem>
              )}
              <DropdownItem key="logout" color="danger">
                <LogoutButton href={'/users/login'} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : null}
    </Navbar>
  );
};

export default NavigationBar;
