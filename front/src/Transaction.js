import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NodeApi from './NodeApi'


function Transaction() {

  const { txid } = useParams()
  const [txInfo, setTxInfo] = useState(null)

  useEffect(() => {
    const getTxInfo = async () => { setTxInfo(await NodeApi.getTransaction(txid)) }
    getTxInfo()
  }, [txid])

  if (!txInfo) return ''

  return (
    <div className="container">
      <p>transaction hash {txid} found in block {txInfo.block}</p>
    </div>
  )
}

export default Transaction
