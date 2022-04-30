import React from 'react'
import Homes from '../../pages/Homes'
import Profil from '../../pages/Profil'
import Trending from '../../pages/Trending'
import ErrorPage from '../ErrorPage'
import Navbar from '../Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const index = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

    </Router>
  )
}

export default index