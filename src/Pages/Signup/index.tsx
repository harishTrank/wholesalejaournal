import React from 'react'
import SignupImage from '../../images/Signup.jpg'
import './style.css'
import { Link } from 'react-router-dom'
const index = () => {
  return (
    <div className='login-section'>
    <div className="login-card">
      <div className="login-card-left">
        <img 
          src={SignupImage}
          alt="Login Illustration" 
        />
      </div>
      <div className="login-card-right">
        <h1>Signup</h1>
        <form>
          <div className="input-group">
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" required />
          </div>
          
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Enter your password again" required />
          </div>
          <button type="submit">Signup</button>
          <p>Already have an account? <Link to='/login'><u>Login</u></Link> </p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default index
