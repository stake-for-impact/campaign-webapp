import { testVault, testNFT } from "./contracts";
import { readContract, writeContract } from '@wagmi/core'

interface HarvestButtonProps {
    vaultAddress: string;
  }
  

const HarvestButton: React.FC<HarvestButtonProps>= ({ vaultAddress }) => {

  const handleHarvest = async () => {
    try {
      const { hash } = await writeContract({
        address: testVault.address,
        abi: testVault.abi,
        functionName: "harvestRewards",
      })
      console.log("Approved:", hash)
    } catch (error) {
      console.error("Approval failed", error)
    }
  }

  return (
    <button onClick={handleHarvest} className="bg-blue-500 w-48 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Harvest rewards</button>
  )
}

export default HarvestButton;