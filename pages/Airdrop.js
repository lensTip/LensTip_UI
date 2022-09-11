import React, {useEffect, useState } from 'react'
import Header from '../components/Header'
import { ethers } from 'ethers'
import { getPubId, client, getPublications, getByOwned } from '../api'

const style = {
    button : `"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
  }
const Airdrop = () => {
  const [account, setAccount] = useState()
  const [posts, setPost] = useState([])
  const [profile, setProfile] = useState()
  const [mypost, setpost] = useState('')
  const [isLoading, setLoading] = useState(false)

  const changepost = ({ target }) => {
    setpost(target.value)
  }

  return (
    <div className="overflow-hidden">
        <Header/>
        <div className='h-screen px-4 py-4 flex justify-center bg-[#d9ead3]'>
           <div className='mx-auto justify-center  divide-blue-200  '>
            <div className='mx-auto px-10 py-10 text-3xl text-center text-sky-400'>
                <span >
                Airdrop for all Followers 
                </span>
                
                <div className='mx-auto px-10 py-10'>
                <input
                    className="mx-auto px-4 py-3 text-xl"
                    placeholder='Total Amount'
                    type="number"
                    onChange={changepost}>
                </input>
                
                </div>
                <button type="submit" className={style.button}>Drop!</button>
            </div>
            <div className='mx-auto px-4 py-4 text-xl text-center'>
                
            </div>
           
           </div>
            
        </div>
        
    </div>
  )
}

export default Airdrop