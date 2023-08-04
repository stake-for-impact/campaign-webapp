'use client'

import { useContractReads } from 'wagmi'

import { stringify } from '../utils/stringify'

export function ReadContracts() {
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
    ],
  })

  return (
    <div>
      <div>Data:</div>
      {isLoading && <div>loading...</div>}
      {isSuccess &&
        data?.map((data) => <pre key={stringify(data)}>{stringify(data)}</pre>)}
    </div>
  )
}
