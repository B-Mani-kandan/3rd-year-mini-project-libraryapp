import React,{useState} from 'react'
import styles from './global.module.css'
// import data from '../data/data.json'

function AboutBooks({bookList,BooksData}) {
 
  let [currentBook,setcurrentBook] =useState([])

  let  handleClick = (bd) =>{
      let bookData = BooksData.filter((d)=>d['Title'] === bd)
      setcurrentBook(bookData)
  }



  return (
    <div className={styles.AboutBooks}>
          <div className={styles.booksname}>
              <h1 className={styles.header}>Total Books</h1>
              {bookList.map((data,i)=><p key={i} onClick={()=>handleClick(data)}>{data}</p>)}
          </div>
          {currentBook.length ? <div className={styles.booksHolder}>
          <h1 className={styles.header}>Book Detail</h1>
              <h2 style={{color:' #5c49db'}}>{currentBook[0]['Title']}</h2>
              <h3>Publisher : {currentBook[0]['Publishers']}</h3>
              <h3>Total number of Books : {currentBook.length}</h3>
              <h3>Total number of Books Avaliable : 1</h3>
              <button className={styles.btn} style={{marginRight:'3%' ,border:'3px solid green'}}>Request Book</button>
              <button className={styles.btn}>Submit Book</button>
          </div>:<h1 style={{textAlign:'center',margin:'20% 0%',width:'50%'}}>Please Select Book</h1>}
    </div>
  )
}

export default AboutBooks