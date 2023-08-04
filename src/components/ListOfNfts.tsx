'use client'
import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { ethers } from 'ethers';
import { getAccount } from '@wagmi/core'
import NftWithdrawButton from './NftWithdrawButton'


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

const NFTList = () => {
    const [nfts, setNFTs] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const connectedAddress = getAccount().address;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const data = await request<{ nfts: NFT[] }>(
                SUBGRAPH_URL, 
                QUERY,
                { address: connectedAddress}
              );
            const userNFTs = data.nfts;
            console.log("userNFTs:", userNFTs)
            console.log("userNFTs.length:", userNFTs.length)
    
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
    
    const renderButton = async () => {
      /*if (nfts.length === 0) {
        console.log("nftls length is 0")
        return <div>No NFTs found for this user.</div>
      } else {*/
        return <ul>
        {nfts.map((nft) => (
            <li key={nft.id}>
                NFT ID: {nft.tokenId} | Amount: {nft.amount} | <NftWithdrawButton tokenId={nft.tokenId} />
            </li>
        ))}
    </ul>
      }
    }
  
    return (
      <div>
        <h2>NFTs owned by the user for this vault:</h2>
        {renderButton()}
      </div>
    );
  };
  
  export default NFTList;
  