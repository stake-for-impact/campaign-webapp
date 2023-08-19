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
      <div className='container flex-col max-w-[1000px] mx-auto'>
        <CampaignHero />
        <CampaignStats />
        <StakeComponent />   
      </div> 
      <Footer />
    </div>
  )
}

export default Page
