import React from 'react'

function Product({title,name,price}) {


  return (
    <div style={{background:'grey' ,width:'100%' ,height:'100px',marginBottom:'50px'}}>
          <p>{title}</p>
          <p>{name}</p>
          <p>{price}</p>
    </div>
  )
}

export default Product