import React from 'react'
import Image from 'next/image'
import '../input.css'; // You can create a separate CSS file for styling if needed

const CampaignHero = () => {
    return (
      <div className='flex flex-col justify-center items-center'>
        <div className='bg-cover w p-4' style={{
          backgroundImage: `url('/cba-hero-image.png')`,
        }}>
          <Image src="/come-back-alive-logo.svg" alt="Come Back Alive Logo" width={106} height={53} />
          <div className='bg-white bg-opacity-60 mt-48'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-black text-left m-4 text-black'>
                Stake ETH and automatically donate staking rewards to Come back Alive
              </h1>
            </div>
          </div>
        </div>
        <div className='text-black m-4 flex-col justify-center items-center'>
          <p className="text-left">
            Stake for Ukraine is a community project to support Ukrainian people in their fight 
            for freedom against Russian invasion. This particular campaign allows holders of ETH to stake 
            their ETH and automatically donate staking rewards to Come back Alive.
          </p>
          <p className='underline text-right'>
            Read more
          </p>
        </div>
      </div>
    );
  };

export default CampaignHero;