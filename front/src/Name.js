import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NodeApi from './NodeApi'


function Name() {

  const { name } = useParams()
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const getNameInfo = async () =>  { setInfo(await NodeApi.getName(name)) }
    getNameInfo()
  }, [name])

  if (!info) return ''

  else if (!info.result.info && info.result.start.reserved === true) {
    return (
      <div className="container">
        <h2>{name}</h2>
        <p>reserved but unclaimed</p>
      </div>
    )
  }

  else if (!info.result.info && info.result.start.reserved === false) {
    return (
      <div className="container">
        <h2>{name}</h2>
        <p>unclaimed</p>
      </div>
    )
  }

  else {

    return (
    <div className="container">
      <h2>{info.result.info.name}</h2>
      <ul>
        <li>claimed</li>
        <li>block <Link to={`/b/${info.result.info.height}`}>{info.result.info.height}</Link></li>
        <li>transaction <Link to={`/t/${info.result.info.owner.hash}`}>{info.result.info.owner.hash}</Link></li>
      </ul>
    </div>
    )
  }

}

export default Name
