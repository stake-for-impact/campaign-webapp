'use client'
import React, { useState, ChangeEvent } from 'react';
import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Connected } from '../components/Connected'
import { parseEther } from 'viem';
import NFTList from './ListOfNfts';



const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/49319/sfi-nft-deployment1/version/latest';
const CONTRACT_ADDRESS = '0x74D946e9a3786a04617a88CbB74e22018219527f';
const ABI = [{"inputs":[{"internalType":"address","name":"_stETHaddress","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"address","name":"_imNFTaddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HarvestRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StakeToLido","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"beneficiaryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"harvestRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"imNFT","outputs":[{"internalType":"contract StakeForImpactNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stETH","outputs":[{"internalType":"contract IstETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeToLido","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalDepositedEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transferResidues","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/e31a7da7487642f1997f48691834aab1', 5);
const signer = provider.getSigner();

const StakeComponent  = () => {
    const [amount, setAmount] = useState('');

    const { write } = useContractWrite({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'deposit',
        onSettled(data, error) {
            console.log('Settled', { data, error })
          },
      });
    

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }

    const handleStake = async () => {
        if (amount === '') {
            alert('Please enter an amount');
            return;
        }

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const amountBigInt = amountInWei.toBigInt(); // Convert BigNumber to bigint

            await write({ value: amountBigInt })
        } catch (error) {
            console.log('Transaction failed', error);
        }
    }

        return (
            <div className='flex flex-col items-center'>
                Your stake
                <div className=" border-2 border-yellow-200 p-4 m-6 rounded-xl lg:w-3/5">
            <Connected>
                
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={handleInputChange} 
                        className="border m-2 border-blue-500 py-2 px-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48"
                    />
                    <button 
                        onClick={handleStake} 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 hover:bg-blue-400 text-white font-bold py-2 px-4 m-2 border-b-4 border-blue-700 w-48 hover:border-blue-500 rounded"
                    >
                        Stake
                    </button>
                <NFTList />
            </Connected>
            </div>
        </div>
        )
}

export default StakeComponent