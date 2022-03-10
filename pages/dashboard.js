import React from "react";
import AboutBooks from "../components/AboutBooks";
import Books from "../components/Books";
import Mybook from "../components/Mybook";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";


const dasboard = ({BooksData}) => {
  
  let totalNumberOfBooksAvaliable = BooksData.filter((d)=>d.currentHolder === "libary").length

  function booksList() {
    let copyData = [...BooksData]
    let books = []
    for(let data of copyData){
        let push = true
        if(books.length===0){
          books.push(data['Title'])
        }
        for(let bk of books ){
            if(data['Title']===bk){
                push = false
            }
        }
        if(push){
          books.push(data['Title'])
      }
    }
    return books
}  


  return (
    <div>
      <NavBar />
      <section style={{ maxWidth: "1100px", margin: "50px auto" }}>
        <div className={styles.main}>
          <div className={styles.booksDesign}>
            <Books />
          </div>
          <div style={{ width: "60%" }}>
            <div className={styles.booksContainer}>
              <div>
                <h3>Total  Books</h3>
                <h1>{booksList().length}</h1>
              </div>
              <div>
                <h3>Total number of Books in count</h3>
                <h1>{BooksData.length}</h1>
              </div>
            </div>
            <div className={styles.avaliableBooks}>
              <div>
                <h3>Total number of Books Avaliable</h3>
                <h1>{totalNumberOfBooksAvaliable}</h1>
              </div>
            </div>
          </div>
        </div>

      <h1 style={{margin:'120px 0 30px 0',fontSize:'40px'}}>Books Mangement</h1>
      <AboutBooks bookList ={booksList()} BooksData={BooksData}/>

      <h1 style={{margin:'120px 0 30px 0',fontSize:'40px'}}>My Books</h1>
      <Mybook/>
      </section>
    </div>
  );
};


export async function getServerSideProps() {

  const Books = await fetch(
    `http://localhost:3000/api/hello`
  )
  const BooksData = await Books.json()

  return {
    props: { BooksData },
  }

}


export default dasboard;