import React,{useState} from "react";
import AboutBooks from "../components/AboutBooks";
import Book from "../components/Books";
import Mybook from "../components/Mybook";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";
import { parseCookies } from "nookies";
import { URL } from "../URL";



const Dasboard = ({BooksData,UserData,requestedBooks,returnBooks}) => {


  let [myRequestedBooks,setMyRequestedBooks] = useState(requestedBooks)

  let [rBooks,setReturnBooks] = useState(returnBooks)

  let [myBooks,setMyBooks] = useState(UserData[0].Books)

  let [Books,setBooks] = useState(BooksData)

  let [loading,setLoading] = useState(false)
  
  let totalNumberOfBooksAvaliable = Books.filter((d)=>d.currentHolder === "libary").length

  function booksList() {
    let copyData = [...Books]
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
      <NavBar Regno={UserData[0].Regno} name={UserData[0].Name}/>
      {loading && <Loader/>}
      <main style={{ maxWidth: "1100px", margin: "50px auto" }}>
        <div className={styles.main}>
          <div className={styles.booksDesign}>
            <Book/>
          </div>
          <div style={{ width: "60%" }}>
            <div className={styles.booksContainer}>
              <div>
                <h3>Total  Books</h3>
                <h1>{booksList().length}</h1>
              </div>
              <div>
                <h3>Total number of Books in count</h3>
                <h1>{Books.length}</h1>
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
      <AboutBooks setLoading={setLoading} setMyRequestedBooks={setMyRequestedBooks} bookList ={booksList()} BooksData={Books}/>

      <h1 style={{margin:'120px 0 30px 0',fontSize:'40px'}}>My Books</h1>
      <Mybook setLoading={setLoading} setReturnBooks={setReturnBooks} UserData={UserData} myBooks={myBooks} setMyBooks={setMyBooks}/>

      <section>
      <h1 style={{margin:'120px 0 30px 0',fontSize:'40px'}}>Requested Books</h1>
      <div>
      {myRequestedBooks.length === 0 && <h2>If you want get  book from libary then Please Make Get Request </h2>} 
      {myRequestedBooks.length>0 && myRequestedBooks.map(d=><div key={d._id} style={{border:'3px solid white',padding:'2%',marginBottom:'20px',borderRadius:'4px',backgroundColor:'white'}}>
       <h3>{d.Title}</h3>
       <p style={{color:'red'}}>Wating for Admin Confirmation</p> 
      </div>)}
      </div>
      </section>

     <section>
      <h1 style={{margin:'120px 0 30px 0',fontSize:'40px'}}>Return Request</h1>
      <div>
      {rBooks.length===0 && <h2>If you want return your book to libary then Please Make Return Request </h2>}
      {rBooks.length>0 && rBooks.map(d=><div key={d._id} style={{border:'3px solid white',padding:'2%',marginBottom:'20px',borderRadius:'4px',backgroundColor:'white'}}>
       <h3>{d.Title}</h3>
       <p style={{color:'red'}}>Wating for Admin Confirmation</p> 
      </div>)}
      </div>
      </section>


      </main>
    </div>
  );
};


export async function getServerSideProps(ctx) {

  const { token } = parseCookies(ctx);

  const data = await fetch(`${URL}/api/checkuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  token
    },
  });

  let res =await data.json()


  if(res.message === 'token required'){
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
  }
  }
  if(res?.user ==='admin'){
    return {
      redirect: {
        permanent: false,
        destination: '/admin'
      }
  }
  }
  
  const Books = await fetch(
    `${URL}/api/hello`,{
      headers: {
      method: 'GET',
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }
  )
  const Data = await Books.json()

  let BooksData = Data.data
  let requestedBooks = Data.requestedBooks
  let UserData = Data.user
  let returnBooks = Data.returnBooks

  return {
    props: { BooksData ,UserData,requestedBooks,returnBooks}
  }

}


export default Dasboard;