import { Link } from "react-router-dom"



function TxInput({ input }) {

  return (
    <div className="container">
      <p><Link to={`/a/${input.coin.address}`}>{input.coin.address}</Link> : {input.coin.value/1000000}</p>
    </div>
  )
}

export default TxInput
