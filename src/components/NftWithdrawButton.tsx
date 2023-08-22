import React, { useEffect, useState } from 'react';
import { testVault, testNFT } from "./contracts";
import { readContract, writeContract } from '@wagmi/core'


interface WithdrawButtonProps {
  tokenId: number;
}
  

const NftWithdrawButton: React.FC<WithdrawButtonProps>= ({ tokenId }) => {
  const [approvalResult, setApprovalResult] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

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
      setApprovalResult(data)
      setLoading(false)
    } catch (error) {
      console.error("Couldn't read fetApproved:", error)
      setLoading(false)
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
      setApprovalResult(testVault.address)
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
        args: [tokenId as unknown as bigint],
      })
      console.log("Withdraw transaction has:", hash)
    } catch (error) {
      console.error("Withdraw failed", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {approvalResult === testVault.address ? (
        <button onClick={handleWithdraw}>Withdraw</button>
      ) : (
        <button onClick={handleApproval}>Approve</button>
      )}
    </div>
  )
}

export default NftWithdrawButton;