import Product from '../components/product'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hi guys</h1>
      <Product title={'arun'} name='mani' price='3000'/>
      <Product title={'asd'} name='asd' price='34'/>
      <Product title={'asd'} name='asd' price='34'/>
      <Product title={'asd'} name='asd' price='34'/>
      <Product title={'asd'} name='asd' price='34'/>
    
    </div>
  )
}
