import { useState } from "react";
import LoginAdmin from "../components/LoginAdmin";
import LoginCard from "../components/LoginCard";
import styles from "../styles/Home.module.css";

export default function Home() {
 
const[btn,setBtn] = useState( 'Student')
  let loginDiv 
  switch (btn) {
    case 'Student':
      loginDiv = <LoginCard/>
      break;
      case 'Admin':
      loginDiv =  <LoginAdmin />
      break
  }


  return (
    <div className={styles.holder}>
      <div className={styles.swiftBtn}>
        {["Student", "Admin"].map((d, i) => (
          <button
           className={d === btn ? `${styles.button} ${styles.active}` : `${styles.button}`}
            key={i}
            onClick={() => setBtn(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <div className={styles.login}>
        {loginDiv}
      </div>
    </div>
  );
}
