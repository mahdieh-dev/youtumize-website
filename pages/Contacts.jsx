import React from "react";
import styles from "./contacts.module.css";

const Contacts = () => {
  return (
    <div>
      <h2 className={styles.h2}>Contact Us</h2>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          required
        />

        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
        />

        <label className={styles.label} htmlFor="message">
          Message:
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          required
        ></textarea>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contacts;
