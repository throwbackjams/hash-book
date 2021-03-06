import React from 'react'
import Image from 'next/image'

const Signup = ({setRegistered, name, setName, url, setUrl}) => {

    const style = {
        wrapper: `flex flex-col p-4 justify-center items-center h-full w-full bg-[#252526] w-min h-min rounded-2xl`,
        logoName: 'flex items-center text-white font-bold text-lg',
        title: `text-[#afb3b8] font-semibold text-lg`,
        form: `flex flex-col items-center`,
        fieldContainer: `my-4 `,
        inputTitle: `text-[#afb3b8] font-semibold mb-2 ml-3`,
        inputContainer: `flex items-center w-[20rem] bg-[#2d2d2d] rounded-full`,
        inputField: `h-full bg-[#2d2d2d] w-[20rem] text-white px-2 py-1 mx-1 rounded-full mb-2`,
        randomUrl: `h-full bg-[#2d2d2d] text-[#afb3b8] px-2 py-1 mx-1 hover:px-3 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
        submitButton: `bg-[#3a3b3d] text-white font-semibold px-4 py-2 hover:px-6 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
      }
      
    return(
        <div className={style.wrapper}>
            <div className={style.logoContainer}>
            <div className={style.logoName}>
                <Image
                    src = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Hash-dynamic-gradient.png'
                    height={40}
                    width={40}
                    alt = 'hashbook logo'
                    
                />Hashbook</div>
                
            </div>
            <div className={style.title}>Please Sign Up</div>
            <form className={style.form}>
                <div className={style.fieldContainer}>
                    <div className={style.inputTitle}>Name</div>
                    <div className={style.inputContainer}>
                        <input
                        value = {name}
                        onChange = {event => setName(event.target.value)}
                        required
                        className={style.inputField}/>
                    </div>
                </div>
                <div className={style.fieldContainer}>
                    <div className={style.inputTitle}>Profile Image URL</div>
                    <div className={style.inputContainer}>
                        <input
                        value = {url}
                        onChange = {event => setUrl(event.target.value)}
                        required
                        className={style.inputField}/>
                    </div>
                </div>
                <div className={style.fieldContainer}>
                </div>
                <button className={style.submitButton} type='submit'>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Signup