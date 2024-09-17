import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Journal Components/Sidebar";
import Card from "../../components/Journal Components/Card";
import Footer from "../../components/Footer";
import "./style.css";
import { Link } from "react-router-dom";
import { journalBooksProducts } from "../../store/Services/Product";

const Index = () => {
   const [journalProducts,setJournalProducts]:any=useState([])
   const [journalCount,setJournalCount]:any=useState([])
   const [categoryCount,setCategoryCounts]:any=useState([])
   const [sortOption,setSortOption]:any=useState('')
   const [selectedColors,setSelectedColors]:any=useState([])
   const [currentPage, setCurrentPage]:any = useState(1);
   const [totalPage,setTotalPage]:any=useState(1);
  
   
  useEffect(()=>{
    journalBooksProducts({
      query:{
        sort_by: sortOption,
        color: selectedColors||'',
        page:currentPage
      }
    }).then((res:any)=>{
      setJournalProducts(res.results)
      setJournalCount(res.count)
      setCategoryCounts(res.category_counts)
      setTotalPage(res.total_pages)
      

    })
  },[sortOption,selectedColors,currentPage])
  
  const handleSortChange = (e:any) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    setCurrentPage(1)
  };
  // const handleColorChange = (colors:any) => {
  //   setSelectedColors(colors); 
  // };
  
  const goToNextPage = () => {
    if (totalPage > currentPage) {
      setCurrentPage((oldval:any)=>oldval+1);
    }
  };
  
  const goToPreviousPage = () => {
    if (totalPage >= currentPage) {
      setCurrentPage((oldval:any)=>oldval-1);
    }
  };
  return (
    <div className="journal">
      <Header />
      <div className="container">
        <section className="gap">
          <div className="flex space-bw">
            <div className="sidebar-section">
              <Sidebar  categoryCount={categoryCount} />
            </div>
            <div className="journal-section">
              <div className="journal-content">
                <p>Home/Journal Books</p>
                <h1>Journal Books</h1>
                <div className="default-sorting flex space-bw al-center">
                  <p>Showing all {journalCount} results</p>
                  <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="latest">Sort by latest</option>
                  <option value="price_low_to_high">Sort by price: low to high</option>
                  <option value="price_high_to_low">Sort by price: high to low</option>
                  </select>
                </div>
                <div className="journal-cards flex ">
                  
                  {journalProducts.map((product:any,index:any)=>(
                    <Card product={product} index={index} key={index} />
                  ))}
                    
                  
                </div>
                <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage===1}>Previous</button>
        <button onClick={goToNextPage} disabled={currentPage===totalPage}>Next</button>
      </div>
              </div>
            </div>

          
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
