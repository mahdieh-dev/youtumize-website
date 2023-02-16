import React from "react";
import Header from "../header/Header";
import styles from "./notfound.module.css";

const NotFound = () => (
  <div>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <button className={styles.actionButton}>Go Home</button>
    </div>
  </div>
);

export default NotFound;
