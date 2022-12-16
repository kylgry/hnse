import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NodeApi from './NodeApi'
import TxInput from './TxInput'
import TxOutput from './TxOutput'
import Loading from './Loading'



function Transaction() {

  const { txid } = useParams()
  const [txInfo, setTxInfo] = useState(null)

  useEffect(() => {
    const getTxInfo = async () => { setTxInfo(await NodeApi.getTransaction(txid)) }
    getTxInfo()
  }, [txid])

  if (!txInfo) return <Loading />

  return (
    <div className="container">
      <h2>tx {txid.slice(0,40)}...</h2>
      <p>block <Link to={`/b/${txInfo.height}`}>{txInfo.height}</Link> at {(new Date(txInfo.time*1000)).toISOString()}</p>
      <p>inputs</p>
      {txInfo.inputs.map((i, n) => (<TxInput input={i} key={n} />))}
      <p>outputs</p>
      {txInfo.outputs.map((o, n) => (<TxOutput output={o} key={n} />))}
    </div>
  )
}

export default Transaction
