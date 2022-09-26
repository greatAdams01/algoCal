import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BaseLayout from '../layout/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({

    uri: 'http://localhost:8000/graphql',
  
    cache: new InMemoryCache(),
  
  });
  
  return (<>
  <ApolloProvider client={client}>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </ApolloProvider>
  </>)
}

export default MyApp
