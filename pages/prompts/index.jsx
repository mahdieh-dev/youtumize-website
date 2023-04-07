import React from "react";
import styles from "./prompts.module.css";
import Header from "../../components/header/Header";
import { useEffect } from "react";
import useFirebase, { ECollection } from "../../hooks/useFirebase";
import { useCallback } from "react";
import { useState } from "react";
import Image from "next/image";
import { emptyPrompts } from "../../assets";
import { useRouter } from "next/router";

const Prompts = () => {
  const { getFromDatabase, loading } = useFirebase();
  const [promptsArray, setPromptsArray] = useState([]);
  const router = useRouter();

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

  const handleGoHomeclick = useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>
          {loading || promptsArray.length > 0
            ? "Your Prompts History"
            : "No Prompts Yet!"}
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
            <></>
          )}
          {!loading && promptsArray.length === 0 ? (
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
              <div onClick={handleGoHomeclick} className={styles.goHomeButton}>
                Let's go!
              </div>
            </div>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Prompts;
