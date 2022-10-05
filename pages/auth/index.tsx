import type { ReactElement } from 'react'
import { useRouter } from "next/router";
import AuthLayout from '../../layout/AuthLayout'
import Login from '../../components/auth/Login';
import Head from 'next/head';
import SignUp from '../../components/auth/SignUp';

enum QueryOptions {
	VERIFY_TOKEN = "verify token",
	FORGOT_PASSWORD = "forgot password",
	CHANGE_PASSWORD = "change password",
	LOGIN = "login",
	SIGNUP = "signup",
}

const AuthPage = () => {
  const router = useRouter();
  const mode = router.query?.mode || "login";
  return (
    <AuthLayout>
    <>
    <Head>
      <title>AlgoCal awaits</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      {mode === QueryOptions.LOGIN && <Login />}
			{mode === QueryOptions.SIGNUP && <SignUp />}

      {/* <button onClick={() => router.push('/auth?mode=signup')}>Change mode</button> */}
    </>
    </AuthLayout>
  )
}

export default AuthPage