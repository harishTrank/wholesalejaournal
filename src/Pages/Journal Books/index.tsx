import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Journal Components/Sidebar";
import Card from "../../components/Journal Components/Card";
import Footer from "../../components/Footer";
import "./style.css";
import { Link } from "react-router-dom";
import { journalBooksProducts } from "../../store/Services/Product";
import { Pagination } from "antd";
import FullScreenLoader from "../../components/FullScreenLoader";

const JournalBook = ({ bookType }: any) => {
  const [journalProducts, setJournalProducts]: any = useState([]);
  const [journalCount, setJournalCount]: any = useState([]);
  const [categoryCount, setCategoryCounts]: any = useState([]);
  const [sortOption, setSortOption]: any = useState("");
  const [selectedColors, setSelectedColors]: any = useState("");
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPage, setTotalPage]: any = useState(3);
  const [linedProducts, setLinedProducts]: any = useState("");
  const [coverType, setCoverType]: any = useState("");
  const [bookTypeFilter, setBookTypeFilter]: any = useState(bookType);
  const [isLoading, setIsLoading]: any = useState(false);
  const [search, setSearch]: any = useState("");

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    bookType === "JournalBooks"
      ? setBookTypeFilter("JournalBooks")
      : bookType === "WritingJournal"
      ? setBookTypeFilter("WritingJournal")
      : setBookTypeFilter("Others");
  }, [bookType]);

  useEffect(() => {
    setIsLoading(true);
    journalBooksProducts({
      body: {
        sort_by: sortOption,
        color: selectedColors || "",
        lined_non_lined: linedProducts || "",
        cover_type: coverType || "",
        category: bookTypeFilter,
        title: search,
      },
      query: {
        page: currentPage,
      },
    }).then((res: any) => {
      setJournalProducts(res.results);
      setJournalCount(res.count);
      setCategoryCounts(res.category_counts);
      setTotalPage(res.total_pages);
      setIsLoading(false);
    });
  }, [
    sortOption,
    selectedColors,
    currentPage,
    linedProducts,
    coverType,
    bookTypeFilter,
    search,
  ]);

  const handleSortChange = (e: any) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    setCurrentPage(1);
  };

  return (
    <div className="journal">
      <Header />
      {isLoading && <FullScreenLoader />}
      <div className="container">
        <section className="gap">
          <div className="flex space-bw">
            <div className="sidebar-section">
              <Sidebar
                categoryCount={categoryCount}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                linedProducts={linedProducts}
                setLinedProducts={setLinedProducts}
                coverType={coverType}
                setCoverType={setCoverType}
                setBookTypeFilter={setBookTypeFilter}
                setSearch={setSearch}
              />
            </div>
            <div className="journal-section">
              <div className="journal-content">
                <p>Home/Journal Books</p>
                <h1>
                  {bookTypeFilter === "JournalBooks"
                    ? "Journal Books"
                    : bookTypeFilter === "WritingJournal"
                    ? "Writing Journal"
                    : "Uncategorised"}
                </h1>
                <div className="default-sorting flex space-bw al-center">
                  <p></p>
                  {/* <p>Showing all {journalCount} results</p> */}
                  <select value={sortOption} onChange={handleSortChange}>
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="latest">Sort by latest</option>
                    <option value="price_low_to_high">
                      Sort by price: low to high
                    </option>
                    <option value="price_high_to_low">
                      Sort by price: high to low
                    </option>
                  </select>
                </div>

                {journalCount && journalCount != 0 ? (
                  <>
                    <div className="journal-cards flex ">
                      {journalProducts.map((product: any, index: any) => (
                        <Card product={product} index={index} key={index} />
                      ))}
                    </div>
                    {journalProducts?.[0]?.first_product_id && (
                      <div className="pagination-controls">
                        <Pagination
                          current={currentPage}
                          total={totalPage * 10}
                          onChange={onPageChange}
                          showSizeChanger={false}
                          showQuickJumper
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-data text-center">
                    <p>Oops! No data found!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default JournalBook;
