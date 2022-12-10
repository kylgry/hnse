import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NodeApi from './NodeApi'


function Address() {

  const { address } = useParams()
  const [addressInfo, setAddressInfo] = useState(null)

  useEffect(() => {
    const getAddressInfo = async () => { setAddressInfo(await NodeApi.getAddress(address)) }
    getAddressInfo()
  }, [address])

  if (!addressInfo) return ''

  return (
    <div className="container">
      <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>{JSON.stringify(addressInfo, null, 4)}</pre>
    </div>
  )
}

export default Address
