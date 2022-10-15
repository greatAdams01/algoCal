import type { ReactElement } from 'react'
import { useRouter } from "next/router";
import AuthLayout from '../../layout/AuthLayout'
import Login from '../../components/auth/Login';
import Head from 'next/head';
import SignUp from '../../components/auth/SignUp';
import Script from 'next/script';

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
  const ClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID

  function handleCredentialResponse(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
  return (
    <AuthLayout>
    <>
    <Script src="https://accounts.google.com/gsi/client"></Script>
    <Head>
      <title>AlgoCal awaits</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="google-signin-client_id" content={`ClientID.apps.googleusercontent.com`}></meta>
    </Head>
      {mode === QueryOptions.LOGIN && <Login />}
			{mode === QueryOptions.SIGNUP && <SignUp />}

      <div id="g_id_onload"
         data-client_id={ClientID}
         data-callback="handleCredentialResponse">
    </div>
    <div className="g_id_signin" data-type="standard">
      <img src="/img/Twitter.png" className='w-[35px] h-[35px]' alt="" />
    </div>



      {/* <button onClick={() => router.push('/auth?mode=signup')}>Change mode</button> */}
    </>
    </AuthLayout>
  )
}

export default AuthPage