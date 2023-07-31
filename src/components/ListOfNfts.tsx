'use client'
import { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { ethers } from 'ethers';
import { getAccount } from '@wagmi/core'


interface NFT {
    id: string;
    tokenId: number;
    amount: number;
    owner: {
      address: string;
    };
  }  

const QUERY = `
  query MyQuery($address: String!) {
    nfts(where: {owner_: {address: $address}}) {
      amount
      id
      tokenId
      owner {
        address
      }
    }
}`;

const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/49319/sfi-nft-deployment1/version/latest';
const CONTRACT_ADDRESS = '0x74D946e9a3786a04617a88CbB74e22018219527f';
const ABI = [{"inputs":[{"internalType":"address","name":"_stETHaddress","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"address","name":"_imNFTaddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HarvestRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StakeToLido","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"beneficiaryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"harvestRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"imNFT","outputs":[{"internalType":"contract StakeForImpactNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stETH","outputs":[{"internalType":"contract IstETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeToLido","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalDepositedEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transferResidues","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/e31a7da7487642f1997f48691834aab1', 5);
const signer = provider.getSigner();

const NFTList = () => {
    const [nfts, setNFTs] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const connectedAddress = getAccount().address;
  
    useEffect(() => {
      const fetchData = async () => {
        console.log(connectedAddress)
        try {
            const data = await request<{ nfts: NFT[] }>(
                SUBGRAPH_URL, 
                QUERY,
                { address: connectedAddress}
              );
            console.log(QUERY)
            console.log(data)
            const userNFTs = data.nfts;
    
            if (userNFTs.length > 0) {
              setNFTs(userNFTs);
            } else {
              setNFTs([]);
            }
    
            setLoading(false);
          } catch (error) {
            setError('Error fetching NFTs');
            setLoading(false);
          }
        };
  
      fetchData();
    }, []);
  
    /*
    const handleWithdraw = async (tokenId) => {
      // Call the withdraw function of the smart contract with the tokenId
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const transaction = await contract.withdraw(tokenId);
        await transaction.wait();
        // Update the state or display a success message
      } catch (error) {
        // Handle error if the transaction fails
      }
    };
    */
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (nfts.length === 0) {
        return <div>No NFTs found for this user.</div>;
      }    
  
    return (
      <div>
        <h2>NFTs owned by the user for this vault:</h2>
        <ul>
            {nfts.map((nft) => (
                <li key={nft.id}>
                    NFT ID: {nft.tokenId} | Amount: {nft.amount} | Withdraw button
                </li>
            ))}
        </ul>
      </div>
    );
  };
  
  export default NFTList;
  