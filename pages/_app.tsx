import type { ReactElement, ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import toast, { Toaster } from 'react-hot-toast';
import cookie from 'js-cookie'
import { TOKEN_NAME } from '../util/constants';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const token = cookie.get(TOKEN_NAME)
  const client = new ApolloClient({

    uri: 'http://localhost:8000/graphql',
  
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  
  });
  
  return getLayout(<>
  <ApolloProvider client={client}>
      <Component {...pageProps} />
      <Toaster />
  </ApolloProvider>
  </>)
}

export default MyApp
