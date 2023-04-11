import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { UserContext } from "../../providers/UserProvider";
import styles from "./home.module.css";
import useGenerate from "../../hooks/useGenerate";
import useAuthentication from "../../hooks/useAuthentication";

const Home = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const { generate, isGenerating, generatedContent } = useGenerate();
  const { checkIsLoggedIn } = useAuthentication();

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const onUserChangedText = useCallback((event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
  }, []);

  const handleSubmitClick = useCallback(async () => {
    await generate(userInput);
  }, [generate, userInput]);

  if (!!!user) {
    return <div></div>;
  }

  return (
    <div>
      <Header />
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            SEO-Optimized Youtube Video Content Generator
          </h1>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter video subject"
            value={userInput}
            onChange={onUserChangedText}
          />
          <button
            className={styles.button}
            onClick={handleSubmitClick}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>

          {generatedContent.length > 0 && (
            <div className={styles.outputContainer}>
              <h3 className={styles.subtitle}>
                SEO-optimized content for this video:
              </h3>
              {generatedContent.split("\n").map((el, ind) => {
                if (el.length === 0) {
                  return <></>;
                }
                const splitted = el.split(":");
                return (
                  <div key={`${el}-${ind}`}>
                    <p className={styles.textBold}>{splitted[0] + ":"}</p>
                    <p className={styles.text}>
                      {splitted.length > 2
                        ? splitted.slice(1).join(":")
                        : splitted[1]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {/* {apiOutput && (
        <>
          <h3 className={styles.subtitle}>Description:</h3>
          <p className={styles.text}>{description}</p>
        </>
      )}
      {apiOutput && (
        <>
          <h3 className={styles.subtitle}>Tags:</h3>
          <p className={styles.text}>{tags}</p>
        </>
      )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
