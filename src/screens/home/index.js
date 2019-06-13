import React from 'react';
import Search from './components/Search'
import Books from './components/Books'
import './home.css'


const Home = () => (
  <div id="home" className="page">
    <div className="container">
      <Search />
      <Books />
    </div>
  </div>
)
export default Home;