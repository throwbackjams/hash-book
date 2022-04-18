import type { NextPage } from 'next'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import SignUp from '../components/SignUp'
import Feed from '../components/Feed'

const style = {
  wrapper: `bg-[#18191a] min-h-screen duration-[0.5s]`,
  homeWrapper: `flex`,
  center: `flex-1`,
  main: `flex-1 flex justify-center`,
  signupContainer: `flex items-center justify-center w-screen h-[70vh]`,
}

const Home: NextPage = () => {
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [users, setUsers] = useState([])

  const wallet = useWallet()

  return (
    <div className={style.wrapper}>
      {/* Header*/}
    
      {registered ? (
        <div className={style.homeWrapper}>
          {/* <Sidebar> */}
          <div className={style.main}>
            <Feed connected={wallet.connected} name={name} url={url}/>
          </div>
          {/* <RightSidebar> */}
        </div>
      ) : (
        <div className={style.signupContainer}>
          <SignUp
            setRegistered = {setRegistered}
            name = {name}
            setName = {setName}
            url = {url}
            setUrl = {setUrl}
          />
          </div>
      )}
    </div>
  )
}

export default Home
