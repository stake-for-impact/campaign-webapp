'use client'

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { request } from 'graphql-request';
import * as dotenv from 'dotenv';

dotenv.config();

interface VaultData {
  vaults: {
    totalHarvested: number;
  }[];
}

const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/49319/sfi-nft-deployment1/version/latest';
const CONTRACT_ADDRESS = '0x74D946e9a3786a04617a88CbB74e22018219527f';
const ABI = [{"inputs":[{"internalType":"address","name":"_stETHaddress","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"address","name":"_imNFTaddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HarvestRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StakeToLido","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"beneficiaryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"harvestRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"imNFT","outputs":[{"internalType":"contract StakeForImpactNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stETH","outputs":[{"internalType":"contract IstETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeToLido","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalDepositedEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transferResidues","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/e31a7da7487642f1997f48691834aab1', 5);

const CampaignStats = () => {
  const [totalStaked, setTotalStaked] = useState<number | null>(null);
  const [totalStakers, setTotalStakers] = useState<number | null>(null);
  const [totalHarvested, setTotalHarvested] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total staked of ETH
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        const balance = await contract.totalDepositedEth()
        setTotalStaked(parseFloat(ethers.utils.formatEther(balance)))

        // Fetch total harvested
        const query = `
          query {
              vaults(where: { address: "${CONTRACT_ADDRESS}" }) {
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
    <div>
      Vault address: 
        <a href={`https://goerli.etherscan.io/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer">
          {CONTRACT_ADDRESS}
        </a>
      <br />
      Campaign created:<br />
      Total Staked: {totalStaked !== null ? `${totalStaked} ETH` : 'Loading...'}<br />
      Stakers:<br />
      Harvested to date: {totalHarvested !== null ? `${totalHarvested} ETH` : 'Loading...'}<br />
    </div>
  );
};

export default CampaignStats;
