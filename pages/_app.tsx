import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from 'models'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Component

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
