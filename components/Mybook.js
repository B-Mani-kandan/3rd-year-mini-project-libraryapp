import React from "react";
import styles from "./global.module.css";

const Mybook = ({ UserData, myBooks, setMyBooks,setReturnBooks }) => {
  let currentUserRegistorNumber = UserData[0].Regno;

  let sendReturnRequest = async(bookId) => {
    const res = await fetch(`http://localhost:3000/api/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId:currentUserRegistorNumber,
        bookId,
      }),
    });
    let response = await res.json();
  
    if(response.status = 200){
      let {returnBooks,myBooks} = response
      setMyBooks(myBooks)
      setReturnBooks(returnBooks)
    }
  };

  return (
    <div
      className={styles.AboutBooks}
      style={{
        height: "350px",
        overflowY: "scroll",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {myBooks.length <= 0 && <h2>Request for new Book :)</h2>}
      {myBooks.length > 0 &&
        myBooks.map((data, i) => (
          <div
            key={i}
            style={{
              width: "80%",
              background: "white",
              padding: "1%",
              marginBottom: "2%",
              borderRadius: "4px",
              marginTop: "20px",
            }}
          >
            <h2>{data.Title}</h2>
            <h3>
              Author : <span>{data.Authors}</span>
            </h3>
            <button
              style={{
                backgroundColor: "green",
                border: "1px solid green",
                color: "white",
              }}
              onClick={() => sendReturnRequest(data._id)}
            >
              return book
            </button>
          </div>
        ))}
    </div>
  );
};

export default Mybook;
