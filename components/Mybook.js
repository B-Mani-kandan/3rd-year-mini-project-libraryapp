import React from "react";
import styles from "./global.module.css";
import cookie from "js-cookie";
import { URL } from "../URL";


const Mybook = ({ UserData, myBooks, setMyBooks,setReturnBooks,setLoading }) => {
  let currentUserRegistorNumber = UserData[0].Regno;

  let sendReturnRequest = async(bookId) => {
    setLoading(true)
    const res = await fetch(`${URL}/api/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  cookie.get("token")
      },
      body: JSON.stringify({
        userId:currentUserRegistorNumber,
        bookId,
      }),
    });
    let response = await res.json();
  
    if(response.status = 200){
      setLoading(false)
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
