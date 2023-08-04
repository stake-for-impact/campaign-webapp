'use client'

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { request } from 'graphql-request';
import * as dotenv from 'dotenv';
import { testVault } from './contracts'
import { readContract, writeContract } from '@wagmi/core'
import HarvestButton from './HarvestButton';


dotenv.config();

interface VaultData {
  vaults: {
    totalHarvested: string;
  }[];
}

const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/49319/sfi-nft-deployment1/version/latest';

const CampaignStats = () => {
  const [totalStaked, setTotalStaked] = useState<number | null>(null);
  const [totalStakers, setTotalStakers] = useState<number | null>(null);
  const [totalHarvested, setTotalHarvested] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total staked of ETH
        const balance = await readContract({
          address: testVault.address,
          abi: testVault.abi,
          functionName: 'totalDepositedEth'
        })
        console.log("balance:", balance)
        console.log("parsed:", parseFloat(ethers.utils.formatEther(balance)))
        setTotalStaked(parseFloat(ethers.utils.formatEther(balance)))

        // Fetch total harvested
        const query = `
          query {
              vaults(where: { address: "${testVault.address}" }) {
                totalHarvested
              }
          }
        `;
        const data = await request<VaultData>(SUBGRAPH_URL, query)
        const convertedValue = ethers.utils.formatUnits(data.vaults[0].totalHarvested);
        const formattedValue = parseFloat(convertedValue).toPrecision(4);
        setTotalHarvested(formattedValue);

        // Fetch total stakers



      } catch (error) {
        console.error(error);
        setTotalStaked(null);
        setTotalHarvested(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='text-center'>
      Vault address: 
        <a href={`https://goerli.etherscan.io/address/${testVault.address}`} target="_blank" rel="noopener noreferrer">
          {testVault.address}
        </a>
      <br />
      Campaign created:<br />
      Total Staked: {totalStaked !== null ? `${totalStaked} ETH` : 'Loading...'}<br />
      Stakers:<br />
      Harvested to date: {totalHarvested !== null ? `${totalHarvested} ETH` : 'Loading...'}<br />
      
      <HarvestButton vaultAddress={testVault.address} />
    </div>
  );
};

export default CampaignStats;
