import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header';
import Select from 'react-select';
import { ethers } from 'ethers'
import Image from "next/image";
import {
    client, getFollowers, getByOwned
} from "../api"
import toast, { Toaster } from 'react-hot-toast'


const SendTip = () => {
    const [profile, setProfile] = useState()
    const [account, setAccount] = useState()
    const [amount, setAmount] = useState(0)
    const [options, setOptions] = useState()
    const [followers, setFollowers] = useState()
    const [isLoading, setLoading] = useState(false)
    const [elementA, setElementA] = useState({ value: 'handler', label: 'handler' })

    useEffect( ()=> {
        connect()
    },[])
    useEffect( ()=> {
        if(!account) return
        fetchProfile();
        
    },[account])
    useEffect( ()=> {
        if(!profile) return
        fetchFollwers();
    },[profile])

    const confirmClaim = (msg) => toast(msg)

    async function tipAmount(amount, address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        try {
            const transaction = await signer.sendTransaction({to:address, value: ethers.utils.parseEther(amount)});
            await transaction.wait()
            confirmClaim('transaction successful!')
          } catch (error) {
            console.log(error)
          }
    }
    async function connect(){
        setLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const account = await signer.getAddress()
        setAccount(account)
        setLoading(false)
    }
    async function fetchProfile(){
        setLoading(true)
        console.log(account)
        try {
            const response = await client.query(getByOwned, {owner: account}).toPromise()
            console.log(response)
            const profile = response.data.profiles.items[0]
            setProfile(profile)
            console.log(profile)
        } catch (err) {
        console.log({ err})
        }
        setLoading(false)
    }
    async function fetchFollwers(){
        console.log(profile.id)
        try {
            const response = await client.query(getFollowers, {id: profile.id}).toPromise()
            const follows = response.data.followers.items
            console.log(follows)
            const options = [];
            const followers = await Promise.all( response.data.followers.items.map(async (follo) => {
                let data = {
                    address: follo.wallet.address,
                    id: follo.wallet.defaultProfile?.id ? follo.wallet.defaultProfile?.id : 'empty',
                    name: follo.wallet?.defaultProfile?.name ? follo.wallet?.defaultProfile.name : 'unknown',
                    handle: follo.wallet.defaultProfile?.handle ? follo.wallet?.defaultProfile.handle : 'unknown',
                    picture: follo.wallet.defaultProfile?.picture.original.url ? follo.wallet.defaultProfile.picture.original.url : 'https://i.imgur.com/MLaFQ6u.jpg'
                }
                options.push({ value: data.address, label: data.handle })
                return data
            } ))
            setOptions(options)
            setFollowers(follows)
            console.log(followers)
        } catch (err) {
        console.log('error searching profiles...', {err})
        }
    }
    const changeAmount = ({ target }) => {
        setAmount(target.value)
      }
      if (isLoading) return 
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
            </div>
            </div>
        </div>
        </div>
  return (
    <div className='overflow-hidden'>
    <Header/>
    <div className='py-10 px-10 bg-[#2B425A] text-xl'>
        <div className=" mx-10 py-10 px-4 grid  grid-flow-col gap-4 ">
            {profile ? (
                <>
            <div className="mx-auto py-10 px-4 row-span-3 justify-self-center border-solid border-4 border-sky-500 rounded-lg">
            {
                profile?.picture && profile?.picture.original ? (
                    <div className="mx-10 px-4 py-10 ">
                        <Image
                        src={profile.picture.original.url}
                        width="400"
                        height="400"
                        />
                    </div>

                ) : (
                <div/>
                )
            }
            </div>
            <div className="mx-10 py-10 px-4 text-[#FFFFFF] col-span-2 border-solid border-4 border-sky-500 rounded-lg">
                <div className='py-10 px-10 text-xl '>{profile.name}</div>
                <div className='py-4 px-4 text-xl '>{profile.bio}</div>
                <div className='py-4 px-4 text-xl '>total Followers: {profile.stats.totalFollowers}</div>
                <div className='py-4 px-4 text-xl '>total Following: {profile.stats.totalFollowing}</div>
            </div>
            <div className="justify-center mx-10 py-10 px-4 row-span-2 col-span-2 border-solid border-4 border-sky-500 rounded-lg">
                <div className='mx-auto'>
                <div  className='mx-10 px-4 text-2xl text-[#26abab] '>Karma to my best Follower</div>
                <div className=' flex px-4 py-4 items-center'>
                    <span  className="mx-auto px-4 py-4 text-xl text-[#FFFFFF]">Amount to Tip</span>
                <input
                    className="mx-auto px-4 py-3 text-xl"
                    placeholder={amount}
                    type="number"
                    onChange={changeAmount}>
                </input>
                <Select
                    value={elementA}
                    onChange={setElementA}
                    options={options}
                    className='py-4 px-4 text-xl '
                />
                <button className='bg-violet-400 mx-auto text-[#FFFFFF] text-lg py-3 px-4 rounded-lg cursor-pointer hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'
                onClick={ () => tipAmount(amount, elementA.value) } >Tip</button>
                </div>
                </div>
                <div className='flex mx-auto '>
                    <div>
                        <span className='mx-auto px-4 text-[#FFFFFF]'> address:</span>
                        <span className='mx-auto px-4 text-[#26abab]'> {elementA.value}</span>
                        <span className='mx-auto px-4 text-[#FFFFFF]'> amount: </span>
                        <span className='mx-auto px-4 text-[#e3b92d]'>{amount} Matic</span>
                    </div>
                </div>
            </div>
                
                </>
            ):(
                <>
                <div className='h-screen bg-green text-xl'>
                    you dont have a Lens profile.
                </div>
                </>
            )}
   
        </div>

    </div>
    </div>
  )
}

export default SendTip