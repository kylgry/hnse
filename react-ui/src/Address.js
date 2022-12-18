import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NodeApi from './NodeApi'
import Loading from './Loading'

function Address() {

  const { address } = useParams()
  const [addressInfo, setAddressInfo] = useState(null)

  useEffect(() => { 
    
    async function getAddressInfo() {
      let result = await NodeApi.getAddress(address)
      setAddressInfo(result)
    }
    
    getAddressInfo() 
  
  }, [address])

  if (!addressInfo) return <Loading />

  return (
    <div className="container">
      <h2>address {address}</h2>
      <p>{addressInfo.totalCoins/1000000} hns</p>
      <p>transactions</p>
      {addressInfo.txs.map(n => (
      <div className="indent1" key={n.hash}>
        <Link to={`/t/${n.hash}`} key={n.hash}>{n.hash}</Link> : <Link to={`/b/${n.height}`}>{n.height}</Link> : {(new Date(n.time*1000)).toString().slice(0,28)}
      </div>))}
    </div>
  )
}

export default Address
