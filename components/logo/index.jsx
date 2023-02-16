import { useRouter } from "next/router";
import React from "react";
import styles from "./logo.module.css";

const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")} className={styles.logo}>
      You<div className={styles.tumize}>tumize</div>
    </div>
  );
};

export default Logo;
