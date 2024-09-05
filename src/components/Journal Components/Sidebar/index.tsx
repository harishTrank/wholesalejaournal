import React from 'react'
import './style.css'
const index = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            <div className="search-products flex mb">
                <input type="text" placeholder='Search Products..' />
                <button>Search</button>
            </div>
            <div className='Uncategorised mb'>
                <p className='mb'>Uncategorised</p>
                <p className='mb'>Journal Books</p>
                <p className='mb'>Writing Journals</p>
            </div>
            <div className="filtercolor mb">
                <h2 className='mb'>Filter By color</h2>
               <label htmlFor='blue'>
                <input type="checkbox" />
                <span>Blue</span>
               </label>
               <label htmlFor='Grey'>
                <input type="checkbox" />
                <span>Grey</span>
               </label>
               <label htmlFor='Green'>
                <input type="checkbox" />
                <span>Green</span>
               </label>
               <label htmlFor='Red'>
                <input type="checkbox" />
                <span>Red</span>
               </label>
               <label htmlFor='Yellow'>
                <input type="checkbox" />
                <span>Yellow</span>
               </label>
               

            </div>
            <div className="filtercategory mb">
                <h2 className='mb'>Filter by category</h2>
                <label htmlFor="">
                    <input type="checkbox" />
                    <span>Lined Template</span>
                </label>
                <label htmlFor="">
                    <input type="checkbox" />
                    <span>Non Lined Template</span>
                </label>

            </div>
            <div className="covertype mb">
                <h2 className='mb'>Filter by cover type</h2>
            <label htmlFor="">
                    <input type="checkbox" />
                    <span>Hard Cover</span>
                </label>
                <label htmlFor="">
                    <input type="checkbox" />
                    <span>Leather</span>
                </label>
                <label htmlFor="">
                    <input type="checkbox" />
                    <span>Soft Cover</span>
                </label>
            </div>
        </div>
      
    </div>
  )
}

export default index
