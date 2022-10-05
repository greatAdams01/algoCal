import { useState } from 'react'
import Link from 'next/link'
import { SearchIcon, MenuAlt1Icon, XIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import IsLogged from './auth/IsLogged'


function MobileHeader() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <>
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
            {!open ? 
            <MenuAlt1Icon className='w-8 text-[#4059AD] cursor-pointer' onClick={() => setOpen(true)} /> 
            : <XIcon className='w-8 text-[#4059AD] cursor-pointer'  onClick={() => setOpen(false)}  />}
          </div>
        </nav>
      </header>
      {!open ? <div></div>
        :
        <div className='fixed h-[100vh] z-10 bg-white w-full px-10 py-2 transition-all'>
        <ul className='pt-3 text-[#4059AD] font-Pop text-[16px]'>
          <li onClick={() => setOpen(false)} className='mobLink'>
            <Link href="/">
              <a>Organize</a>
            </Link>
          </li>
          <li onClick={() => setOpen(false)} className='mobLink'>
            <Link href="/event/create">
              <a>Create An Event</a>
            </Link>
          </li>
          <li onClick={() => setOpen(false)} className='mobLink'>
            <Link href="/">
              <a>Help</a>
            </Link>
          </li>
        </ul>
        <div className='space-x-4 pt-4'>
            <IsLogged />
          </div>
      </div>
      }
    </>
  )
}

export default MobileHeader