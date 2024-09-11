import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Journal Components/Sidebar'
import Card from '../../components/Journal Components/Card'
import Footer from '../../components/Footer'
import './style.css'
import { Link } from 'react-router-dom'


const index = () => {
  
  return (
    <div className='journal'>
      <Header/>
      <div className="container">
        <section className='gap'>
            <div className='flex space-bw'>
        <div className="sidebar-section">
        <Sidebar/>
      </div>
      <div className="journal-section">
        <div className="journal-content">
            <p>Home/Shop</p>
            <h1>Shop</h1>
            <div className="default-sorting flex space-bw al-center">
                <p>Showing all 9 results</p>
                <select name="" id="">
                    <option value="">Default sorting</option>
                    <option value="">Sort by popularity</option>
                    <option value="">Sort by average rating</option>
                    <option value="">Sort by latest</option>
                    <option value="">Sort by price:low to high</option>
                    <option value="">Sort By price:high to low</option>
                </select>
            </div>
            <div className="journal-cards">
              <Link to='customise'>
              
              <Card/>
              </Link> 
                
            </div>
        </div>
      </div>
      </div>
        </section>
      </div>

      <Footer/>
      
    </div>
  )
}

export default index

