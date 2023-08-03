import React, { useEffect, useState } from 'react';
import { testVault, testNFT } from "./contracts";
import { readContract, writeContract } from '@wagmi/core'


interface WithdrawButtonProps {
    tokenId: number;
  }
  

const NftWithdrawButton: React.FC<WithdrawButtonProps>= ({ tokenId }) => {
  const [approvalResult, setApprovalResult] = useState<string | null>(null);

  useEffect(() => {
    // Call the checkApproval function only when the component mounts
    checkApproval();
  }, []);

  const checkApproval = async () => {
    try {
    const data = await readContract({
      address: testNFT.address,
      abi: testNFT.abi,
      functionName: 'getApproved',
      args: [BigInt(tokenId)],
      })
      console.log("Approved to:", data)
      setApprovalResult(data);
      return data
    } catch (error) {
      console.error("Couldn't read fetApproved:", error)
    }
  }
  const handleApproval = async () => {
    try {
      const { hash } = await writeContract({
        address: testNFT.address,
        abi: testNFT.abi,
        functionName: "approve",
        args: [testVault.address, BigInt(tokenId)],
      })
      console.log("Approved:", hash)
    } catch (error) {
      console.error("Approval failed", error)
    }
  }
  const handleWithdraw = async () => {
    try {
      const { hash } = await writeContract({
        address: testVault.address,
        abi: testVault.abi,
        functionName: 'withdraw',
        args: [BigInt(tokenId)],
      })
      console.log("Withdraw transaction has:", hash)
    } catch (error) {
      console.error("Withdraw failed", error)
    }
  }

  const renderButton = async () => {
    if (approvalResult === testNFT.address) {
      return <button onClick={handleWithdraw}>Withdraw</button>
    } else {
      return <button onClick={handleApproval}>Approve</button>
    }
  }

  return (
    <div>{renderButton()}</div>
  )
}

export default NftWithdrawButton;