'use client'
import StakedAmount from '../components/CampaignStats'
import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import StakeComponent from '../components/StakeComponent'
import CampaignStats from '../components/CampaignStats'
import NFTList from '../components/ListOfNfts'
import Header from '../components/Header'
import { Connected } from '../components/Connected'
import './global.css'
import '../input.css'



const Page: NextPage = () => {
  return (
    <div className=''>
      <Header />
      <div className='justify-center h-screen container mx-auto'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl text-left p-4'>
            Stake ETH and automatically donate staking rewards to Come back Alive
          </h1>
          <Image src="/come-back-alive-logo.svg" alt="Come Back Alive Logo" width={200} height={100} />

        </div>
        <div className='border-2 border-yellow-200 p-4 m-6 rounded-xl'>
        
              <h2 className='underline text-center '>Vault stats</h2>
              <CampaignStats />
            <br />
        </div>
          <Connected>
            <div className='text-center border-2 p-4 m-6 border-blue-800 rounded-xl'>
              <StakeComponent />
              <NFTList />
            </div>
          </Connected>
        
      </div>
    </div>
  )
}

export default Page
