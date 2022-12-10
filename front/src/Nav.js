import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


function Nav({ handleQuery }) {

  const [query, setQuery] = useState('')
  const navigate = useNavigate()


  const handleChange = evt => { setQuery(evt.target.value) }
  const handleSubmit = evt => {
    evt.preventDefault()
    if (query.length === 42 && query.slice(0,3) === 'hs1') { navigate(`/a/${query}`) }
    else if (query.length === 64) { navigate(`/t/${query}`) }
    else { navigate(`/n/${query}`) }
    setQuery('')
  }


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-6">hnse</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex w-100 ms-4" role="search" onSubmit={handleSubmit}>
            <input className="form-control form-control-sm me-2 text-white bg-dark" type="search" placeholder="search for a name, transaction, or address" aria-label="search" value={query} onChange={handleChange} />
          </form>
        </div>
      </div>
    </nav>

  )

}



export default Nav
