import React from 'react'
import './style.css'
import Header from '../../components/Header'
const index = () => {
  return (
    <div>
        <Header/>
      <div className="container">
        <section className='gap'>
            <div className="my-account">
                <p>Home/My Account</p>
                <h1>My Account</h1>
            </div>
        </section>
      </div>
    </div>
  )
}

export default index
