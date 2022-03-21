import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.background}>
      <div className={styles.ldsCircle}>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
