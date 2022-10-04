import { useRouter } from 'next/router'

function IsLogged() {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.push('/auth?mode=signup')} className='authBtn text-white bg-[#4059AD]'>Sign Up</button>
      <button onClick={() => router.push('/auth?mode=login')} className='authBtn text-[#4059AD]'>Login</button>
    </>
  )
}

export default IsLogged