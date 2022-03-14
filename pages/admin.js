import React, { useState, useEffect } from "react";
import Book from "../components/Books";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

const Admin = ({ dataTOsendForRequest, data ,returnBookData}) => {
  let [requestedBooks, setRequestedBooks] = useState([]);
  let [studetsBookData, setStudentsBookData] = useState([]);
  let [rB,setRb] = useState([])
  let [allBooks,setallBooks] = useState(data)

  useEffect(() => {
    let studetsData = allBooks.filter((data, i) => data.currentHolder != "libary");

    setStudentsBookData(studetsData);
  }, []);



  useEffect(() => {
    let temporyData = [];

    for (let req of dataTOsendForRequest) {
      for (let book of req.requestedBooks) {
        temporyData.push({
          Name: req.Name,
          RegNo: req.RegNo,
          Book: book.Title,
          _id: book._id,
        });
      }
    }
    setRequestedBooks(temporyData);

    let tempReturn = [];
    for (let req of returnBookData) {
      for (let book of req.retunBooks) {
        tempReturn.push({
          Name: req.Name,
          RegNo: req.RegNo,
          Book: book.Title,
          _id: book._id,
        });
      }
    }
    setRb(tempReturn)

  }, []);

  let acceptReq = async (Regno, id) => {
    const res = await fetch(`http://localhost:3000/api/acceptreq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Regno,
        BookId: id,
      }),
    });
    let response = await res.json();

    let {dataTOsendForRequest,allBooksData} = response
    let temporyData = [];

    let studetsData = allBooksData.filter((data) => data.currentHolder != "libary");

    setStudentsBookData(studetsData);

    for (let req of dataTOsendForRequest) {
      for (let book of req.requestedBooks) {
        temporyData.push({
          Name: req.Name,
          RegNo: req.RegNo,
          Book: book.Title,
          _id: book._id,
        });
      }
    }

    setRequestedBooks(temporyData);
    setallBooks(allBooksData)
  };


  let acceptReturn =async (Regno,BookId) =>{
       const res = await fetch(`http://localhost:3000/api/acceptreturn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Regno,
          BookId,
        }),
      });
      let response = await res.json();

      let {returnBookData,data} = response

      let studetsData = data.filter((d) => d.currentHolder != "libary");
      setStudentsBookData(studetsData);

      let tempReturn = [];
      for (let req of returnBookData) {
        for (let book of req.retunBooks) {
          tempReturn.push({
            Name: req.Name,
            RegNo: req.RegNo,
            Book: book.Title,
            _id: book._id,
          });
        }
      }
      setRb(tempReturn)
      setallBooks(data)
  }


  return (
    <div>
      <NavBar Regno="1212" name="Arun" />
      <section style={{ maxWidth: "1100px", margin: "50px auto" }}>
        <div className={styles.main}>
          <div className={styles.booksDesign}>
            <Book />
          </div>
          <div style={{ width: "60%" }}>
            <div className={styles.booksContainer} style={{height:'100%',alignItems:'center'}}>
              <div>
                <h3>Total Books in libary</h3>
                <h1>{allBooks.length}</h1>
              </div>
              <div>
                <h3>Total number of Books Students have</h3>
                <h1>{studetsBookData.length}</h1>
              </div>
            </div>
          </div>
        </div>

        <section>


        <h2
            style={{
              margin: "100px 0 0 0",
              textAlign: "center",
              color: "#5c49db",
            }}
          >
            Book Holding Students
          </h2>
          <table  className={styles.table} style={{marginTop:'30px'}}>
            <thead>
              <tr>
                <th>BOOK</th>
                <th> Author</th>
                <th>Holder</th>
              </tr>
            </thead>
            <tbody>
                {studetsBookData.map((d,i)=><tr key={i}>
                  <td>{d.Title}</td>
                  <td>{d.Authors}</td>
                  <td>{d.currentHolder}</td>
                </tr>)}
            </tbody>
          </table>
        </section>

        <section>
          <h2
            style={{
              margin: "100px 0 0 0",
              textAlign: "center",
              color: "#5c49db",
            }}
          >
            Students request for Books
          </h2>
          <table
            className={styles.table}
            style={{ width: "1100px", margin: "20px auto" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Registor Number</th>
                <th>Book</th>
                <th>Accept</th>
              </tr>
            </thead>
            <tbody>
              {requestedBooks.map((data, i) => (
                <tr key={i}>
                  <td>{data.Name}</td>
                  <td>{data.RegNo}</td>
                  <td>{data.Book}</td>
                  <td>
                    <button
                      onClick={() => acceptReq(data.RegNo, data._id)}
                      style={{
                        backgroundColor: "green",
                        border: "1px solid green",
                        color: "white",
                      }}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


  

        <section>
          <h2
            style={{
              margin: "100px 0 0 0",
              textAlign: "center",
              color: "#5c49db",
            }}
          >
            Students request for Return Books to libary
          </h2>
          <table
            className={styles.table}
            style={{ width: "1100px", margin: "20px auto" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Registor Number</th>
                <th>Book</th>
                <th>Accept</th>
              </tr>
            </thead>
            <tbody>
              {rB.map((data, i) => (
                <tr key={i}>
                  <td>{data.Name}</td>
                  <td>{data.RegNo}</td>
                  <td>{data.Book}</td>
                  <td>
                    <button
                      onClick={() => acceptReturn(data.RegNo, data._id)}
                      style={{
                        backgroundColor: "green",
                        border: "1px solid green",
                        color: "white",
                      }}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


      </section>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { cookies } = ctx.req;
  const jwt = cookies.OursiteJWT;

  const Books = await fetch(`http://localhost:3000/api/ownerapi`, {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });
  const Data = await Books.json();

  let { dataTOsendForRequest, admin, data ,returnBookData} = Data;

  return {
    props: { dataTOsendForRequest, admin, data ,returnBookData},
  };
}

export default Admin;
