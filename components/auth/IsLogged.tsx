import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../../atom/creator'
import { TOKEN_NAME } from '../../util/constants'


function IsLogged() {
  
  const [show, setShow] = useState(false)
  const [user, setUser] = useRecoilState(UserAtom)
  const router = useRouter()

  const logout = () => {
    cookie.remove(TOKEN_NAME)
    setUser({})
    router.push('/')
  }

  return (
    <>
      {!user ? 
        <>
          <button onClick={() => router.push('/auth?mode=signup')} className='authBtn text-white bg-[#4059AD]'>Sign Up</button>
          <button onClick={() => router.push('/auth?mode=login')} className='authBtn text-[#4059AD]'>Login</button>
        </> :

        <div>
          <button onClick={() => setShow(!show ? true : false)} className='px-10 rounded-xl border boder-[#4059AD] text-[#4059AD]'>{ user.name }</button>
          <div className={show ? 'block absolute text-center border w-[119px]' : 'hidden text-center'}>
            <button onClick={() => router.push('/event')} className=' boder-[#4059AD] text-[#4059AD]'>Profile</button> <br />
            <button onClick={logout} className='border-t boder-[#4059AD] text-[#4059AD]'>Log out</button>
          </div>
        </div>

      }
    </>
  )
}

export default IsLogged