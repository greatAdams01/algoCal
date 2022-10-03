import { useState } from 'react'
import { useRouter } from "next/router";
import { EyeIcon, EyeOffIcon,  } from '@heroicons/react/outline'
import toast from 'react-hot-toast';
import { isEmail } from '../../util/isEmail';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../apollo/queries/auth';

interface SignUpInput {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

function SignUp() {
  const [show, setShow] = useState(false)
  const [inputs, setInputs] = useState<SignUpInput>({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  });
  const [signupUser] = useMutation(SIGNUP_USER)
  const router = useRouter();

  const handleChange = async (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const signupFun = (e: any) => {
    e.preventDefault()
    const toastId = toast.loading('Loading...');
    if (!inputs.name || !inputs.email || !inputs.password) {
      toast.error('Fill in the fields', {
        id: toastId,
      });
      return
    }
    if (!isEmail(inputs.email)) {
      toast.error('Invalid email', {
        id: toastId,
      });
      return
    }
    if (inputs.password !== inputs.confirmPass) {
      toast.error('Confirm passwords!!!', {
        id: toastId,
      });
      return
    }

    try {
      const CreatorInput = { name: inputs.name, email: inputs.email, password: inputs.password }
      signupUser({
        variables: { name: inputs.name, email: inputs.email, password: inputs.password },
        onCompleted: (data) => {
          console.log(data)
          toast.success('sign up successful', {
            id: toastId,
          })
          router.push('/auth?mode=login')
        },
        onError: (error) => {
          console.log(error.message)
          toast.error(error.message, {
            id: toastId,
          });
        }
      })
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='px-5 py-10 text-[#4059AD] lg:w-1/2 m-auto '>
      <div className='text-center'>
        <h3 className=' text-3xl font-semibold'>Get Started!</h3>
        <h5 className='text-sm'>Create an account</h5>
      </div>
      <div className='w-[336px] lg:w-[455px] m-auto'>
        <form className='px-4'>
            <input 
              className='auth-input'
              type="text" 
              placeholder='Full name'
              name='name'
              value={inputs?.name || ""}
              onChange={handleChange}
            /> <br />
            <input 
              className='auth-input'
              type="email"
              placeholder='Email Address'
              name='email'
              value={inputs?.email || ""}
              onChange={handleChange}
            />
            <div className='flex' >
            <input 
              className='auth-input'
              type={!show ? 'password' : 'text'} placeholder='Password'
              name='password'
              value={inputs?.password || ""}
              onChange={handleChange}
            />
            {!show ? 
              <EyeIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(true)} /> :
              <EyeOffIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(false)} />}
            </div>
            <div className='flex' >
            <input
              className='auth-input'
              type={!show ? 'password' : 'text'}
              placeholder='Comfirm password'
              name='confirmPass'
              value={inputs?.confirmPass || ""}
              onChange={handleChange}
            />
            {!show ? 
              <EyeIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(true)} /> :
              <EyeOffIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(false)} />}
            </div>

              <div className='pt-6 text-center'>
                <button
                  className='bg-[#4059AD] text-white w-[230px] lg:w-[300px] py-2 rounded-xl'
                  onClick={e => signupFun(e)}
                >
                  Sign Up
                </button>
              </div>

        </form>
        <div className='text-center pt-8'>
          <p>Sign Up with</p>
          <div className='flex w-20 space-x-4 m-auto py-2'>
            <img src="/img/Google.png" className='w-[32px] h-[32px]' alt="" />
            <img src="/img/Twitter.png" className='w-[35px] h-[35px]' alt="" />
          </div>
        </div>

        <p className='text-center'>Don’t have an account? <strong className='cursor-pointer' onClick={() => router.push('/auth?mode=login')}>Login</strong></p>

      </div>


    </div>
  )
}

export default SignUp