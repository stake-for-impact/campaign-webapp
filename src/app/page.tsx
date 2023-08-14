'use client'
import StakedAmount from '../components/CampaignStats'
import React from 'react'
import { NextPage } from 'next'
import StakeComponent from '../components/StakeComponent'
import CampaignStats from '../components/CampaignStats'
import NFTList from '../components/ListOfNfts'
import Header from '../components/Header'
import { Connected } from '../components/Connected'
import './global.css'
import '../input.css'
import Footer from '../components/Footer'
import CampaignHero from '../components/CampaignHero'



const Page: NextPage = () => {
  return (
    <div>
      <Header />
      <CampaignHero />
      <CampaignStats />
      <Connected>
        <div className='text-center border-2 p-4 m-6 border-blue-800 rounded-xl'>
          <StakeComponent />
          <NFTList />
        </div>
      </Connected>      
      <Footer />
    </div>
  )
}

export default Page
