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
          const data = await request<{ nfts: NFT[] }>(SUBGRAPH_URL, QUERY, {
            address: connectedAddress,
          });
          const userNFTs = data.nfts;
  
          if (userNFTs.length > 0) {
            setNFTs(userNFTs);
            console.log("nfts:", userNFTs);
          } else {
            setNFTs([]);
          }
  
          console.log("userNFTs.length:", userNFTs.length);
        } catch (error) {
          setError('Error fetching NFTs');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [connectedAddress]);

    console.log("nfts after useeffect:", nfts);
    console.log('loading:', loading);

  
    if (loading) {
      console.log("loadin inside if:", loading);
      return null
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    
    const renderList = async () => {
      if (nfts.length === 0) {
        return <div>No NFTs found for this user.</div>
      } else {
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
        <p>nft.length:</p>{nfts.length}
        <ul>
            {nfts.map((nft) => (
                <li key={nft.id}>
                    NFT ID: {nft.tokenId} | Amount: {nft.amount} | <NftWithdrawButton tokenId={nft.tokenId} />
                </li>
            ))}
        </ul>
      </div>
    );
  };
  
  export default NFTList;
  