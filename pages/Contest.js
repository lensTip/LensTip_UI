import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { ethers } from 'ethers'
import { getPubId, client, getPublications, getByOwned } from '../api'

const style = {
  sellect : `w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
  label : `ml-2 text-sm font-medium text-gray-900 dark:text-gray-300`,
  text : `flex items-center justify-between w-full p-5 font-medium text-left text-white `,
  input : `block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"`,
  button : `"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}

const Contest = () => {
  const [account, setAccount] = useState()
  const [posts, setPost] = useState([])
  const [profile, setProfile] = useState()
  const [mypost, setpost] = useState('')
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    connect()
  }, [])
  useEffect(() => {
    if (!account) return
    fetchProfile();

  }, [account])
  useEffect(() => {
    if (!profile) return
    getPost()

  }, [profile])
  useEffect(() => {
    if (!posts) return
    getRaction()
  }, [posts])

  async function connect() {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    setAccount(account)
    setLoading(false)
  }
  async function fetchProfile() {
    setLoading(true)
    console.log(account)
    try {
      const response = await client.query(getByOwned, { owner: account }).toPromise()
      console.log(response)
      const profile = response.data.profiles.items[0]
      setProfile(profile)
      console.log(profile)
    } catch (err) {
      console.log({ err })
    }
    setLoading(false)
  }
  async function getPost() {
    setLoading(true)
    console.log(profile)
    try {
      const pub = await client.query(getPublications, { id: profile.id, limit: 10 }).toPromise()
      const post = await Promise.all(pub.data.publications.items.map(async (post) => {
        let data = {
          id: post.id,
          metadata: post.metadata.description
        }
        return data
      }))
      setPost(post)
      console.log(post)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  async function getRaction() {
    setLoading(true)
    console.log(posts)
    try {
      const pub = await client.query(getPubId).toPromise()
      console.log(pub)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const changepost = ({ target }) => {
    setpost(target.value)
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
    <div className="overflow-hidden">
      <Header />
      <div className='h-screen px-4 py-4 flex justify-center bg-[#4b6b40]'>
        <div className='mx-auto justify-center divide-y divide-blue-200  rounded'>
          <div className='mx-auto px-4 py-4 text-3xl text-center text-sky-400'>
            Create a contest and reward the winner
          </div>
          <div>
          <fieldset>
            <span className={style.text}>
              Rules to join the Contest 
            </span>
          <legend class="sr-only">Checkbox variants</legend>

          <div class="flex items-center mb-4">
              <input id="checkbox-1" type="checkbox" value="" className={style.sellect}/>
              <label for="checkbox-1" className={style.label}>Fullow</label>
          </div>

          <div class="flex items-center mb-4">
              <input id="checkbox-2" type="checkbox" value="" className={style.sellect}/>
              <label for="checkbox-2" className={style.label}>Like the post</label>
          </div>
          <div class="flex items-center mb-4">
              <input id="checkbox-3" type="checkbox" value="" className={style.sellect}/>
              <label for="checkbox-3" className={style.label}>Mirror the post</label>
          </div>
          <div class="flex items-center mb-4">
              <input id="checkbox-3" aria-describedby="helper-checkbox-text" type="checkbox" value="" className={style.sellect}/>
              <label for="checkbox-3" className={style.label}>Reply the post</label>
            </div>
          <div class="flex items-center mb-4">
              <input id="checkbox-4" type="checkbox" value="" className={style.sellect} disabled=""/>
              <label for="checkbox-4" className={style.label}> Collect </label>
          </div>
        </fieldset>
        <div>
        <div class="mb-6">
            <label for="large-input" className={style.text}>Reward Pool</label>
            <input type="text" id="large-input" className={style.input} placeholder='Amount'/>
        </div>
        <button type="submit" className={style.button}>Submit</button>
        </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Contest