import { Link } from "react-router-dom"



function TxOutput({ output }) {

  return (
    <div className="container">
      <p><Link to={`/a/${output.address}`}>{output.address}</Link> : {output.value/1000000} : {output.covenant.action}</p>
    </div>
  )
}

export default TxOutput
