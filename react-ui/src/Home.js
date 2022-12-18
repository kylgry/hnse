function Home() {
  return (
    <div className="container">
      <p>Handshake is a decentralized, permissionless naming protocol where every peer is validating and in charge of managing the root DNS naming zone with the goal of creating an alternative to existing Certificate Authorities and naming systems. Names on the internet (top level domains, social networking handles, etc.) ultimately rely upon centralized actors with full control over a system which are relied upon to be honest, as they are vulnerable to hacking, censorship, and corruption. Handshake aims to experiment with new ways the internet can be more secure, resilient, and socially useful with a peer-to-peer system validated by the network's participants. - from <a href="https://handshake.org">handshake.org</a></p>
      <p>Read the <a href="https://handshake.org/files/handshake.txt">whitepaper</a>.</p>
      <p>Use this explorer to directly query the handshake blockchain for information about names, transactions, and addresses.</p>
    </div>
  )
}

export default Home
