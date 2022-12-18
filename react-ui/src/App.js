import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from './Nav'
import Home from './Home'
import Name from './Name'
import Transaction from './Transaction'
import Address from './Address'
import Block from './Block'
import './App.css'

function App() {
  
  return (
    <div className="text-bg-dark">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/n/:name" element={<Name />} />
          <Route exact path="/t/:txid" element={<Transaction />} />
          <Route exact path="/a/:address" element={<Address />} />
          <Route exact path="/b/:height" element={<Block />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
