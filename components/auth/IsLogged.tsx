import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../../atom/creator'


function IsLogged() {
  
const [isAuth, setIsAuth] = useState()
const [user, setUser] = useRecoilState(UserAtom)
  const router = useRouter()
  return (
    <>
      {!user ? 
        <>
          <button onClick={() => router.push('/auth?mode=signup')} className='authBtn text-white bg-[#4059AD]'>Sign Up</button>
          <button onClick={() => router.push('/auth?mode=login')} className='authBtn text-[#4059AD]'>Login</button>
        </> :

        <div>{user?.name}</div>

      }
    </>
  )
}

export default IsLogged