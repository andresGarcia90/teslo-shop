'use client';
import { logout } from '@/app/actions/auth/logout';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore();
  const { data: session } = useSession();
  const isAuthenticaded = !!session?.user;
  // const isAdmin = session?.user?.role === 'admin';

  return (
    <div>
      {
        isSideMenuOpen &&
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
        </>
      }
      <nav className={clsx("fixed top-0 right-0 w-[300px] h-screen px-4 bg-white z-20 shadow-2xl transform transition-all duration-300", { "translate-x-full": !isSideMenuOpen })}>
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 hover:cursor-pointer"
          onClick={closeSideMenu}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500' />
        </div>

        {/* Menu */}
        <Link
          href="/profile"
          onClick={closeSideMenu}
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
          <IoPersonOutline size={20} />
          <span className='ml-3 text-sm'>Profile</span>
        </Link>

        {
          isAuthenticaded && (
            <Link
              href="/orders"
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoTicketOutline size={20} />
              <span className='ml-3 text-sm'>Order</span>
            </Link>)}
        {
          isAuthenticaded && (
            <Link
              href="/"
              onClick={() => logout()}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoLogOutOutline size={20} />
              <span className='ml-3 text-sm'>Logout</span>
            </Link>
          )
        }


        {
          !isAuthenticaded &&
          (
            <Link
              href="/auth/login"
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoLogInOutline size={20} />
              <span className='ml-3 text-sm'>Login</span>
            </Link>)
        }


        <div className="w-full h-px bg-gray-200 my-10"></div>

        <Link
          href="/"
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
          <IoShirtOutline size={20} />
          <span className='ml-3 text-sm'>Products</span>
        </Link>

        <Link
          href="/"
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
          <IoTicketOutline size={20} />
          <span className='ml-3 text-sm'>Ordernes</span>
        </Link>
        <Link
          href="/"
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
          <IoPeopleOutline size={20} />
          <span className='ml-3 text-sm'>Users</span>
        </Link>
      </nav>
    </div>
  );
};
