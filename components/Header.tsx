import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SearchIcon } from "@heroicons/react/outline";

function Header() {
  const router = useRouter()

  return (
    <header className='hidden lg:block'>
      <nav className='w-full'>
        <div className='flex justify-between'>
          {/* Logo and search bar */}
          <div className='flex space-x-5'>
            <img className='w-[120px]' src="/img/logo.png" alt="" />
            <div className='pt-2 flex'>
            <input className='bg-[#B7D5D44D] w-[250px] outline-none rounded-xl px-6' type="text" />
            <SearchIcon className='text-[#4059AD] w-4 relative left-[-30px]' />
            </div>
          </div>
          {/* Other nav */}
          <div>
            <ul className='flex space-x-8 pt-3 text-[#4059AD] font-Pop text-[16px]'>
              <li>
                <Link href="/">
                  <a>Organize</a>
                </Link>
              </li>
              <li>
                <Link href="/event/create">
                  <a>Create An Event</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Announcement</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Help</a>
                </Link>
              </li>
            </ul>
          </div>
          {/* Auth btn */}
          <div className='space-x-4'>
            <button className='authBtn text-white bg-[#4059AD]'>Sign Up</button><button onClick={() => router.push('/auth')} className='authBtn text-[#4059AD]'>Login</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header