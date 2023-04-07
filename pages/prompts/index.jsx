import React from "react";
import styles from "./prompts.module.css";
import Header from "../../components/header/Header";
import { useEffect } from "react";
import useFirebase, { ECollection } from "../../hooks/useFirebase";
import { useCallback } from "react";
import { useState } from "react";
import Image from "next/image";
import { emptyPrompts } from "../../assets";

const Prompts = () => {
  const { getFromDatabase } = useFirebase();
  const [promptsArray, setPromptsArray] = useState([]);
  const getPrompts = useCallback(async () => {
    const data = await getFromDatabase(ECollection.PROMPTS);
    if (!data) {
      return;
    }
    setPromptsArray(data.prompts);
  });
  useEffect(() => {
    getPrompts();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>
          {promptsArray.length > 0 ? "Your Prompts History" : "No Prompts Yet!"}
        </h2>
        <ul className={styles.ul}>
          {promptsArray.length > 0 ? (
            promptsArray.map((el, ind) => {
              return (
                <li key={ind} className={styles.li}>
                  {el}
                </li>
              );
            }, [])
          ) : (
            <div className={styles.emptyWrapper}>
              <div className={styles.emptyImageWrap}>
                <Image
                  src={emptyPrompts}
                  alt="new-idea-empty-prompts"
                  className={styles.emptyPromptsImage}
                />
                <p className={styles.emptyText}>
                  Go ahead and get your first seo-optimized contents!
                </p>
              </div>
              <div className={styles.goHomeButton}>Let's go!</div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Prompts;
