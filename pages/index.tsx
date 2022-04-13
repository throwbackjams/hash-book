import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffet } from 'react'
import SignUp from '../components/SignUp'

const style = {
  wrapper: `bg-[#18191a] min-h-screen duration-[0.5s]`,
  homeWrapper: `flex`,
  center: `flex-1`,
  main: `flex-1 flex justify-center`,
  signupContainer: `flex items-center justify-center w-screen h-[70vh]`,
}

const registered = true

const Home: NextPage = () => {
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [users, setUserse] = useState([])

  return (
    <div className={style.wrapper}>
      {/* Header*/}
    
      {registered ? (
        <div className={style.homeWrapper}>
          {/* <Sidebar> */}
          <div className={style.main}>
            HOME FEED
            {/* <Feed> */}
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
