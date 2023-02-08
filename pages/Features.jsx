import React from "react";
import styles from "./features.module.css";

const Features = () => {
  return (
    <div>
      <h2 className={styles.h2}>Features</h2>
      <ul className={styles.ul}>
        <li className={styles.li}>
          Generate SEO-optimized Youtube video titles, descriptions, and tags
        </li>
        <li className={styles.li}>
          Use the latest language models and algorithms to generate content
        </li>
        <li className={styles.li}>
          Get more views and engagement on your Youtube videos
        </li>
        <li className={styles.li}>
          Customize the output to match your brand's tone and style
        </li>
        <li className={styles.li}>
          Integrate with your existing content production workflow
        </li>
      </ul>
    </div>
  );
};

export default Features;
