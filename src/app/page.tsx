'use client'
import StakedAmount from '../components/CampaignStats'
import { ConnectButton } from '../components/ConnectButton'
import { NextPage } from 'next'
import StakeComponent from '../components/StakeComponent'
import CampaignStats from '../components/CampaignStats'
import NFTList from '../components/ListOfNfts'
import { Connected } from '../components/Connected'




const Page: NextPage = () => {
  return (
    <>
      <h1>Name of  our Campaign</h1>

        <hr />
          <h2>Vault stats</h2>
          <CampaignStats />
        <br />
        <hr />

      <ConnectButton />
      <br />
      <Connected>
        <StakeComponent />
        <NFTList />
      </Connected>
    </>
  )
}

export default Page
