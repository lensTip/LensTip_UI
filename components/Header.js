import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "../assets/logotitle.png"

const style = {
    wrapper: `bg-[#041d0a] w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-[#0a8227] font-semibold text-3xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center  `,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-xl text-white px-4 font-bold text-[#a3eef0] hover:text-white cursor-pointer`,
  }
const Header =()=>{
    return <div className={style.wrapper}>
        <Link href="/">
            <div className={style.logoContainer}>
                <Image src={logo} height={60} width={200}/>
            </div>
        </Link>
        <div className={style.searchBar}>
        </div>
        <div className={style.headerItems}>
            <Link href="/Contest">
                <div className={style.headerItem}> Contest</div>
            </Link>
            <Link href="/Airdrop">
                <div className={style.headerItem}> Airdrop</div>
            </Link>
            <Link href="/SendTip">
                <div className={style.headerItem}> Send Tip</div>
            </Link>
            
        </div>
        
    </div>
}
export default Header