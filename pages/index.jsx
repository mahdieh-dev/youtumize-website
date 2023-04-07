import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import { cow } from "../assets";
import Header from "../components/header/Header";
import useFirebase from "../hooks/useFirebase";
import { UserContext } from "../providers/UserProvider";
import styles from "./index.module.css";

const App = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { login } = useFirebase();

  const handleGetStartedClick = useCallback(() => {
    if (!!!user) {
      login(() => router.push("/home"));
    } else {
      router.push("/home");
    }
  }, [user, login, router]);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Generate SEO-optimized Youtube Content
          </h1>
          <p className={styles.subtitle}>
            Input your content ideas and let us do the rest!
          </p>
        </div>
        <div className={styles.main}>
          <Image src={cow} alt="Hero" className={styles.heroImage} />
          <div className={styles.actions}>
            <button
              onClick={handleGetStartedClick}
              className={`${styles.actionButton} ${styles.primary}`}
            >
              Get Started
            </button>
            <button
              className={`${styles.actionButton} ${styles.secondary}`}
              onClick={() => {
                router.push("/features");
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
