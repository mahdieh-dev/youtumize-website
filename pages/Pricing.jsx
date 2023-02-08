import React from "react";
import styles from "./pricing.module.css";

const Pricing = () => {
  return (
    <div>
      <h2 className={styles.h2}>Pricing Plans</h2>
      <div className={styles[`pricing-container`]}>
        <div className={styles.plan}>
          <h3>Monthly Plan</h3>
          <p>$50/month</p>
          <ul>
            <li>Generate SEO-optimized titles</li>
            <li>Generate SEO-optimized descriptions</li>
            <li>Generate SEO-optimized tags</li>
          </ul>
          <button className={styles.button}>Sign Up</button>
        </div>
        <div className={styles.plan}>
          <h3>Annual Plan</h3>
          <p>$450/year</p>
          <ul>
            <li>Generate SEO-optimized titles</li>
            <li>Generate SEO-optimized descriptions</li>
            <li>Generate SEO-optimized tags</li>
          </ul>
          <button className={styles.button}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
