import React,{useState} from "react";
import AboutBooks from "../components/AboutBooks";
import Book from "../components/Books";
import Mybook from "../components/Mybook";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";




const admin = ({BooksData,jwt,UserData,requestedBooks}) => {





//   let [Books,setBooks] = useState(BooksData)
  

//   function booksList() {
//     let copyData = [...Books]
//     let books = []
//     for(let data of copyData){
//         let push = true
//         if(books.length===0){
//           books.push(data['Title'])
//         }
//         for(let bk of books ){
//             if(data['Title']===bk){
//                 push = false
//             }
//         }
//         if(push){
//           books.push(data['Title'])
//       }
//     }
//     return books
// }  


  return (
    <div>
      <NavBar Regno='1212' name='Arun'/>
      <section style={{ maxWidth: "1100px", margin: "50px auto" }}>
        <div className={styles.main}>
          <div className={styles.booksDesign}>
            <Book/>
          </div>
          <div style={{ width: "60%" }}>
            <div className={styles.booksContainer}>
              <div>
                <h3>Total  Books</h3>
                <h1>1230</h1>
              </div>
              <div>
                <h3>Total number of Books in count</h3>
                <h1>123</h1>
              </div>
            </div>
            <div className={styles.avaliableBooks}>
              <div>
                <h3>Total number of Books Avaliable</h3>
                <h1>123</h1>
              </div>
            </div>
          </div>
        </div>

    
      </section>
    </div>
  );
};


// export async function getServerSideProps(ctx) {

//   const { cookies } = ctx.req;
//   const jwt = cookies.OursiteJWT;
  
//   const Books = await fetch(
//     `http://localhost:3000/api/hello`,{
//       headers: {
//       method: 'GET',
//         'Content-Type': 'application/json',
//         Authorization: jwt,
//       }
//     }
//   )
//   const Data = await Books.json()

//   let BooksData = Data.data
//   let requestedBooks = Data.requestedBooks
//   let UserData = Data.user

//   return {
//     props: { BooksData ,jwt,UserData,requestedBooks},
//   }

// }


export default admin;