import React, { useCallback, useState } from "react";
import styles from "./home.module.css";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = useCallback(async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    // console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  });

  const onUserChangedText = useCallback((event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  }, []);

  return (
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
          onClick={callGenerateEndpoint}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        {apiOutput && (
          <div className={styles.outputContainer}>
            <h3 className={styles.subtitle}>
              SEO-optimized content for this video:
            </h3>
            {apiOutput.split("\n").map((el, ind) => {
              if (el.length === 0) {
                return <></>;
              }
              const splitted = el.split(":");
              return (
                <>
                  <p key={ind} className={styles.textBold}>
                    {splitted[0] + ":"}
                  </p>
                  <p key={ind} className={styles.text}>
                    {splitted.length > 2
                      ? splitted.slice(1).join(":")
                      : splitted[1]}
                  </p>
                </>
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
  );
};

export default Home;
