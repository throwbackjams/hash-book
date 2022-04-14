import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WalletBalanceProvider } from '../context/useWalletBalance'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletBalanceProvider>
      <Component {...pageProps} />
    </WalletBalanceProvider>
  )
}

export default MyApp
