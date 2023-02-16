import React, { useCallback, useState } from "react";
import styles from "./contacts.module.css";
import Header from "../../components/header/Header";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        const response = await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (data?.message && data.message === "Success") {
          console.log("Email sent successfully");
        }
      } catch (error) {
        console.log("error when calling email API: ", error);
      }
    },
    [name, email, message]
  );
  return (
    <div>
      <Header />
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label} htmlFor="message">
            Message:
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
