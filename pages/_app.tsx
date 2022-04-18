import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WalletBalanceProvider } from '../context/useWalletBalance'
import { ModalProvider } from 'react-simple-hook-modal'
import dynamic from 'next/dynamic'

const WalletConnectionProvider = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr:false,
  },
)


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <WalletBalanceProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </WalletBalanceProvider>
    </WalletConnectionProvider>
  )
}

export default MyApp
