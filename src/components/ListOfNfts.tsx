'use client'
import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { getAccount } from '@wagmi/core'
import NftWithdrawButton from './NftWithdrawButton'
import { Table } from 'flowbite-react'


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
      fetchData();
    }, [connectedAddress])

      const fetchData = async () => {
        try {
          const data = await request<{ nfts: NFT[] }>(SUBGRAPH_URL, QUERY, {
            address: connectedAddress,
          });
          const userNFTs = data.nfts;
  
          if (userNFTs.length > 0) {
            setNFTs(data.nfts);
            console.log("nfts:", data.nfts);
          } else {
            setNFTs([]);
          }
        } catch (error) {
          setError('Error fetching NFTs');
        } finally {
          setLoading(false);
        }
      };

  
    if (loading) {
      console.log("loadin inside if:", loading);
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    } 

    return (
      <div>
        <h2>Your stake in this vault:</h2>
        {
        nfts.length === 0 ? (
                <div>No NFTs found for this user.</div>
            ) : (
                <ul>
                    {nfts.map((nft) => (
                        <li key={nft.id}>
                            NFT ID: {nft.tokenId} | Amount: {nft.amount} | <NftWithdrawButton tokenId={nft.tokenId}/>
                        </li>
                    ))}
                </ul>
            )}
      </div>
    );
  };
  
  export default NFTList;
  