'use client'

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { request } from 'graphql-request';
import * as dotenv from 'dotenv';
import { testVault } from './contracts'
import { readContract, writeContract } from '@wagmi/core'
import HarvestButton from './HarvestButton';
import { Card } from 'flowbite-react'


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
    <div className='flex flex-col items-center justify-center'>
      <h2 className='content-center'>Vault stats</h2>
      <Card>
      <div className='border-2 border-yellow-200 p-4 m-6 rounded-xl lg:w-3/5'>
        <div className="flex justify-between items-center p-4">
          <div className="text-left">
            Vault address:
          </div>
          <div className="text-right">
            <a href={`https://goerli.etherscan.io/address/${testVault.address}`} target="_blank" rel="noopener noreferrer">
              {testVault.address}
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="text-left">Campaign created:</div>
          <div className="text-right">20 January</div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="text-left">Total Staked:</div>
          <div className="text-right">{totalStaked !== null ? `${totalStaked} ETH` : 'Loading...'}</div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="text-left">Stakers:</div>
          <div className="text-right">Value</div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="text-left">Harvested to date:</div>
          <div className="text-right">{totalHarvested !== null ? `${totalHarvested} ETH` : 'Loading...'}</div>
        </div>
        <div className="flex items-center p-4">
          <HarvestButton vaultAddress={testVault.address} />
        </div>
      </div>
      </Card>
    </div>
  );
};

export default CampaignStats;
