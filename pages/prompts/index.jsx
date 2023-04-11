import React from "react";
import styles from "./prompts.module.css";
import Header from "../../components/header/Header";
import { useEffect } from "react";
import useFirebase, { ECollection } from "../../hooks/useFirebase";
import useAuthentication from "../../hooks/useAuthentication";
import { useCallback } from "react";
import { useState } from "react";
import Image from "next/image";
import { emptyPrompts } from "../../assets";
import { useRouter } from "next/router";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Prompts = () => {
  const { getFromDatabase, loading } = useFirebase();
  const [promptsArray, setPromptsArray] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(undefined);
  const router = useRouter();
  const { checkIsLoggedIn } = useAuthentication();

  const getPrompts = useCallback(async () => {
    const data = await getFromDatabase(ECollection.PROMPTS);
    if (!data) {
      return;
    }
    setPromptsArray(data.prompts ?? []);
  }, [getFromDatabase]);

  useEffect(() => {
    if (checkIsLoggedIn()) {
      getPrompts();
    }
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
          {promptsArray.length ? (
            promptsArray.map((el, ind) => {
              return (
                <div className={styles.promptWrapper} key={ind}>
                  <li
                    key={ind}
                    onClick={() =>
                      setSelectedPrompt((prev) =>
                        prev === undefined ? ind : undefined
                      )
                    }
                    className={`${styles.li} ${
                      selectedPrompt === ind ? styles.selected : ""
                    }`}
                  >
                    {selectedPrompt === ind ? (
                      <RiArrowUpSLine size={24} className={styles.arrowIcon} />
                    ) : (
                      <RiArrowDownSLine
                        size={24}
                        className={styles.arrowIcon}
                      />
                    )}
                    {el.prompt}
                  </li>
                  {selectedPrompt === ind && el.output ? (
                    <p className={styles.outputText}>{el.output}</p>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })
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
