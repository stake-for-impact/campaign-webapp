'use client'
import StakedAmount from '../components/CampaignStats'
import React from 'react'
import { NextPage } from 'next'
import StakeComponent from '../components/StakeComponent'
import CampaignStats from '../components/CampaignStats'
import Header from '../components/Header'
import './global.css'
import '../input.css'
import Footer from '../components/Footer'
import CampaignHero from '../components/CampaignHero'
import FAQ from '../components/FAQ'



const Page: NextPage = () => {
  return (
    <div>
      <Header />
      <div className='container flex-col max-w-[1000px] mx-auto'>
        <CampaignHero />
        <CampaignStats />
        <StakeComponent />
        <FAQ /> 
      </div> 
      <Footer />
    </div>
  )
}

export default Page
