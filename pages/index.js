import Header from '../components/Header'
import Profile from '../components/Profile'
import Footer from '../components/Footer'
import {useWeb3} from '@3rdweb/hooks'
import { Profiler, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
const style = {
  wrapper: `bg-[#10471d]`,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}
const Home = () => {
  const {address, chainId, connectWallet} = useWeb3()
  const welcome = (address, toatHandler = toast) => {
    toatHandler.success(
      `${address !== 'Unnamed' ? ` ${address}` : ''}`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (!address) return
    welcome(address)
    
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-left" reverseOrder={false} />
      {address? (
        <>
          <Header/>
          <Profile/>
          <Footer/>
        </>
      ):(
        <div className={style.walletConnectWrapper}>
            <button className={style.button}
            onClick={() => connectWallet('injected')}
            >
              Connect Wallet on Polygon mainnet.
            </button>
            
            <div className={style.details}>
              You need Chrome to run this App.
            </div>
        </div>
        
      )}
    </div>
  )
}

export default Home