import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { EyeIcon, EyeOffIcon,  } from '@heroicons/react/outline'

function SignUp() {
  const [show, setShow] = useState(false)
  const router = useRouter();


  return (
    <div className='px-5 py-10 text-[#4059AD] w-1/2 m-auto '>
      <div className='text-center'>
        <h3 className=' text-3xl font-semibold'>Get Started!</h3>
        <h5 className='text-sm'>Create an account</h5>
      </div>
      <div className='w-[455px] m-auto'>
        <form className='px-4'>
            <input className='auth-input' type="text" placeholder='Full name' /> <br />
            <input className='auth-input' type="email" placeholder='Email Address' />
            <div className='flex' >
            <input className='auth-input' type={!show ? 'password' : 'text'} placeholder='Password' />
            {!show ? 
              <EyeIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(true)} /> :
              <EyeOffIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(false)} />}
            </div>
            <div className='flex' >
            <input className='auth-input' type={!show ? 'password' : 'text'} placeholder='Comfirm password' />
            {!show ? 
              <EyeIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(true)} /> :
              <EyeOffIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(false)} />}
            </div>

              <div className='pt-6 text-center'>
                <button className='bg-[#4059AD] text-white w-[300px] py-2 rounded-xl' >Sign Up</button>
              </div>

        </form>
        <div className='pt-6 text-center flex- relative bottom-5'>
          <img src="/img/Google.png" className='relative left-[97px] top-[39px]' alt="" />
          <button className=' border-[#4059AD] border text-[#4059AD]  w-[300px] py-2 rounded-xl'>Continue with Google</button>
        </div>

        <p className='text-center'>Don’t have an account? <strong className='cursor-pointer' onClick={() => router.push('/auth?mode=login')}>Login</strong></p>

      </div>


    </div>
  )
}

export default SignUp