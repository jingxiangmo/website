import '../styles/globals.scss'

import { useRouter } from 'next/router'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  if (router.asPath !== '/' && router.asPath !== '/about' && router.asPath !== '/projects' && router.asPath !== '/writings' && router.asPath !== '/contacts') {
    return (
      <Component {...pageProps} />
    )
  }

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
