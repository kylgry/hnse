import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NodeApi from './NodeApi'
import Loading from './Loading'



function Block() {

  const { height } = useParams()
  const [blockInfo, setBlockInfo] = useState(null)

  useEffect(() => {
    const getBlockInfo = async () => { setBlockInfo(await NodeApi.getBlock(height)) }
    getBlockInfo()
  }, [height])

  if (blockInfo === null) return <Loading />

  return (
    <div className="container">
      <h2>block {height}</h2>
      <p>{(new Date(blockInfo.time*1000)).toISOString()}</p>
      <p>{Math.floor(blockInfo.size/1024)} kb, {blockInfo.tx.length} transactions</p>
      {blockInfo.tx.map(n => (<div className="indent1" key={n.hash}><Link to={`/t/${n.txid}`} key={n.hash}>{n.hash}</Link><br /></div>))}
    </div>
  )
}

export default Block
