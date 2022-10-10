import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from '@apollo/client';
import { EyeIcon, EyeOffIcon,  } from '@heroicons/react/outline'
import cookie from "js-cookie";
import toast from 'react-hot-toast';
import { GoogleLogin } from 'react-google-login';
import { isEmail } from '../../util/isEmail';
import { LOGIN_USER } from '../../apollo/queries/auth';
import { TOKEN_NAME } from '../../util/constants';

interface LoginInput {
  email: string;
  password: string;
}

function Login() {
  const [show, setShow] = useState(false)

  const [inputs, setInputs] = useState<LoginInput>({
    email: '',
    password: ''
  });
  const [remeberValue, setRemeberValue] = useState(false)
  const router = useRouter();
  const [ loginUser]= useMutation(LOGIN_USER)

  const handleChange = async (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRemeber = async () => {
    const value = !remeberValue ? true : false
    setRemeberValue(value)
  };

  const loginFun = (e: any) => {
    e.preventDefault()
    const toastId = toast.loading('Loading...');
    if (!inputs.email || !inputs.password) {
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

    try {
      loginUser({
        variables: { email: inputs.email,  password: inputs.password },
        onCompleted({ login }) {
          toast.success('Login successful', {
            id: toastId,
          })
          if (!remeberValue) {
            console.log(login)
            cookie.set(TOKEN_NAME, login?.token, { expires: 1, sameSite: 'None', secure: true })
            router.push('/event')
            return
          }
          cookie.set(TOKEN_NAME, login?.token, { expires: 40, sameSite: 'None', secure: true })
          router.push('/event')
        },
        onError(error) {
          console.log(error.message)
          toast.error(error.message, {
            id: toastId,
          });
        },
      },
      )
    } catch (error) {
      console.log(error)
    }
  }

  const ClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID

  const responseGoogle = (response: any) => {
    console.log(response);
  }

  return (
    <div className='px-5 py-20 text-[#4059AD] lg:w-1/2 m-auto '>
      <div className='text-center'>
        <h3 className=' text-3xl font-semibold'>Welcome Back</h3>
        <h5 className='text-sm'>Login to your account</h5>
      </div>
      <div className='w-[336px] lg:w-[455px] m-auto'>
        <form className='px-4'>
            <input
              name='email'
              className='auth-input'
              type="email"
              placeholder='Email Address'
              value={inputs?.email || ""}
              onChange={handleChange}
            />
            <div className='flex' >
            <input
              name='password'
              className='auth-input'
              type={!show ? 'password' : 'text'}
              placeholder='Password'
              value={inputs?.password || ""}
              onChange={handleChange}
            />
            {!show ? 
              <EyeIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(true)} /> :
              <EyeOffIcon className='w-6 relative right-[35px] pt-5 cursor-pointer' onClick={() => setShow(false)} />}
            </div>

              <div className='lg:flex text-center justify-between px-4'>
              <div className='cursor-pointer pt-2'>
                  <input
                    type="checkbox" 
                    name="remeber"
                    id="remeber"
                    onChange={handleRemeber}
                  />
                  <label className='pl-2' htmlFor="remeber">Remember Me</label>
              </div>
                <div className=' pt-2'>
                  <Link href="/">
                    <a>Forgot Password?</a>
                  </Link>
                </div>
              </div>

              <div className='pt-6 text-center'>
                <button
                  className='bg-[#4059AD] text-white w-[230px] lg:w-[300px] py-2 rounded-xl' type="submit"
                  onClick={(e) =>  loginFun(e)}
                >
                  Login
                </button>
              </div>

        </form>
        <div className='text-center pt-8'>
          <p>Continue with</p>
          <div className='flex w-20 space-x-4 m-auto py-2'>
          <GoogleLogin
            clientId={ClientID || ''}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src="/img/Google.png" className='w-[32px] h-[32px]' alt="" />
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
            
            <img src="/img/Twitter.png" className='w-[35px] h-[35px]' alt="" />
          </div>
        </div>

        <p className='text-center'>Don’t have an account? <strong className='cursor-pointer' onClick={() => router.push('/auth?mode=signup')}>Sign Up</strong></p>

      </div>


    </div>
  )
}

export default Login