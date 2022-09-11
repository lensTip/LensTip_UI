import React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import { ethers } from 'ethers'
import Image from "next/image";
import {
    client, getFollowers, getByOwned
} from "../api"
import toast, { Toaster } from 'react-hot-toast'


const Profile = () => {



  return (
    <div className='overflow-hidden'>
    <div className='bg-[#30e641] '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-basil'>
        <div className='text-center '>
          <div className='flex flex-col md:flex-row w-full space-between items-center'>
            <div className='hidden md:flex flex-col w-full text-left'>
            <div className='h-24'></div>
              <div className='text-neon text-7xl lg:text-9xl'>
                LensTip 
              </div>
              <div className='h-10'></div>
              <div className='text-white text-2xl'>
                Trusted contest and airdrop from your Follower. 
              </div>
              <div className='text-gray text-xl'>
                Deployed in Polygon network.
              </div>
              <div className='h-10'></div>
              <div className='text-black-400 text-2xl'>
              Use LensTip to create a fair contests and airdrop for your community.
              </div>
              <div className='h-24'></div>
              <div className=' text-black-400 text-2xl'>
                We are still in development mode and we are working on contests and airdrop contract. <br/>
                But you can use Tip to tip your follwoers.

              </div>
              <br/>
              <div className=' text-black-400 text-2xl'>
              Gitcoin Grants Round 15 (GR15) is ongoing and will be accepting donations till September 22. 
              <a href="https://twitter.com/gitcoin" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <span className="sr-only">Gitcoin Twitter </span><br/>
                </a>
                <div className='h-24'></div>
                We have created a Gitcoin Grant 

              </div>
            </div>
          </div>

        </div>

      </div>
    
    </div>
    </div>
  )
}

export default Profile