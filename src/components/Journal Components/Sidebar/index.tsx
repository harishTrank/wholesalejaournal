import React, { useEffect, useState } from "react";
import "./style.css";
import { SidebarColors } from "../../../store/Services/Product";
const Sidebar = ({
  categoryCount,
  selectedColors,
  setSelectedColors,
  linedProducts,
  setLinedProducts,
  coverType,
  setCoverType,
  setBookTypeFilter,
  setSearch
}: any) => {
  const [searchInput, setSearchInput]:any = useState(''); 
  const [filterColors,setFilterColors]:any=useState([])
  const handleColorChange = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedColors((prev: string[]) => [...prev, value]);
    } else {
      setSelectedColors((prev: string[]) =>
        prev.filter((color: string) => color !== value)
      );
    }
  };
  const handlelinedProducts = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setLinedProducts((prev: string[]) => [...prev, value]);
    } else {
      setLinedProducts((prev: string[]) =>
        prev.filter((color: string) => color !== value)
      );
    }
  };
  const handleCoverProducts = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setCoverType((prev: string[]) => [...prev, value]);
    } else {
      setCoverType((prev: string[]) =>
        prev.filter((color: string) => color !== value)
      );
    }
  };
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearch(searchInput); 
  };
  useEffect(()=>{
    SidebarColors()
    .then((res:any)=>{
      setFilterColors(res.data)
    })
    .catch((err) => console.log("err", err));
  },[])

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="search-products flex mb">
          <input type="text" placeholder="Search Products.."  value={searchInput} onChange={handleSearchChange}/>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="Uncategorised mb">
          <p
            className="mb classcursor"
            onClick={() => setBookTypeFilter("Others")}
          >
            Uncategorised({categoryCount?.Others || 0})
          </p>
          <p
            className="mb classcursor"
            onClick={() => setBookTypeFilter("JournalBooks")}
          >
            Journal Books ({categoryCount?.JournalBooks || 0})
          </p>
          <p
            className="mb classcursor"
            onClick={() => setBookTypeFilter("WritingJournal")}
          >
            Writing Journals({categoryCount?.WritingJournal || 0})
          </p>
        </div>
        <div className="filtercolor mb">
          <h2 className="mb">Filter By color</h2>
          {Array.isArray(filterColors) && filterColors.map((color: any, index: any) => (
  <label htmlFor={color} key={index}>
    <input
      type="checkbox"
      value={color}
      checked={selectedColors.includes(color)}
      onChange={handleColorChange}
    />
    <span>{color}</span>
  </label>
))}

         
        </div>
        <div className="filtercategory mb">
          <h2 className="mb">Filter by category</h2>
          <label htmlFor="">
            <input
              type="checkbox"
              value="Lined"
              checked={linedProducts.includes("Lined")}
              onChange={handlelinedProducts}
            />
            <span>Lined Template</span>
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              value="NonLined"
              checked={linedProducts.includes("NonLined")}
              onChange={handlelinedProducts}
            />
            <span>Non Lined Template</span>
          </label>
        </div>
        <div className="covertype mb">
          <h2 className="mb">Filter by cover type</h2>
          <label htmlFor="">
            <input
              type="checkbox"
              value="HardCover"
              checked={coverType.includes("HardCover")}
              onChange={handleCoverProducts}
            />
            <span>Hard Cover</span>
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              value="Leather"
              checked={coverType.includes("Leather")}
              onChange={handleCoverProducts}
            />
            <span>Leather</span>
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              value="SoftCover"
              checked={coverType.includes("SoftCover")}
              onChange={handleCoverProducts}
            />
            <span>Soft Cover</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
