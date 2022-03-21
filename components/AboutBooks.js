import React, { useState } from "react";
import styles from "./global.module.css";
// import data from '../data/data.json'


function AboutBooks({ bookList, BooksData,jwt,setMyRequestedBooks ,setLoading}) {
  let [currentBook, setcurrentBook] = useState([]);

  let handleClick = (bd) => {
    let bookData = BooksData.filter((d) => d["Title"] === bd);
    setcurrentBook(bookData);
  };

  let CurrentBookId = async(currentBook) =>{
    setLoading(true)
    let libaryBooks =  currentBook.filter((d) => d.currentHolder === "libary")
    if(libaryBooks.length===0){
      alert('no books are available')
      setLoading(false)
      return
    }
    let curentBookid = libaryBooks[0]._id 
    
    const res = await fetch(`http://localhost:3000/api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt
      },
      body: JSON.stringify({
        bookid:curentBookid
      }),
    });
    let response = await res.json();
    if(response?.message==='error'){
           setLoading(false)
           alert('something went to wrong')
    }
    setLoading(false)
    setMyRequestedBooks(response)
  }

  return (
    <div className={styles.AboutBooks}>
      <div className={styles.booksname}>
        <h1 className={styles.header}>Total Books</h1>
        {bookList.map((data, i) => (
          <p key={i} onClick={() => handleClick(data)}>
            {data}
          </p>
        ))}
      </div>
      {currentBook.length ? (
        <div className={styles.booksHolder}>
          <h1 className={styles.header}>Book Detail</h1>
          <h2 style={{ color: " #5c49db" }}>{currentBook[0]["Title"]}</h2>
          <h3>Publisher : {currentBook[0]["Publishers"]}</h3>
          <h3>Total number of Books : {currentBook.length}</h3>
          <h3>
            Total number of Books Avaliable :
            {currentBook.filter((d) => d.currentHolder === "libary").length}
          </h3>
          <button
            className={styles.btn}
            style={{ marginRight: "3%"}}
            onClick={()=>CurrentBookId(currentBook)}
          >
            Request Book
          </button>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", margin: "20% 0%", width: "50%" }}>
          Please Select Book
        </h1>
      )}
    </div>
  );
}

export default AboutBooks;
