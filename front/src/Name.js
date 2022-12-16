import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NodeApi from './NodeApi'
import Loading from './Loading'


function Name() {

  const { name } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const getNameInfo = async () =>  { setData((await NodeApi.getName(name))) }
    getNameInfo()
  }, [name])

  if (data === null) return <Loading />

  else if (!data.info && data.start.reserved === true) {
    return (
      <div className="container">
        <h2>{name}</h2>
        <p>reserved but not registered</p>
      </div>
    )
  }

  else if (!data.info && data.start.reserved === false) {
    return (
      <div className="container">
        <h2>{name}</h2>
        <p>not registered</p>
      </div>
    )
  }

  else {

    const i = data.info
    const expiryDate = new Date(i.expiryDate).toISOString().slice(0,10)

    return (
    <div className="container">
      <h2>{i.name}</h2>
      <p>registered</p>
      <p>last update in tx <Link to={`/t/${i.owner.hash}`}>{i.owner.hash}</Link></p>
      <p>expires at block {i.stats.renewalPeriodEnd} on approximately {expiryDate}</p>
    </div>
    )
  }

}

export default Name
