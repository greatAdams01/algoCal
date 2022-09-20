import React from 'react'
import { SearchIcon, MenuAlt1Icon } from "@heroicons/react/outline";

function MobileHeader() {
  return (
    <header className='lg:hidden'>
      <nav className='w-full'>
        <div className='flex justify-between'>
          {/* Logo and search bar */}
          <div className='flex space-x-5'>
            <img className='w-[120px]' src="/img/logo.png" alt="" />
            <div className='pt-1 flex'>
            <input className='bg-[#B7D5D44D] w-[185px] outline-none rounded-xl px-6' type="text" />
            <SearchIcon className='text-[#4059AD] w-4 relative left-[-30px]' />
            </div>
          </div>
          <MenuAlt1Icon className='w-8 text-[#4059AD] cursor-pointer' />
        </div>
      </nav>
    </header>
  )
}

export default MobileHeader