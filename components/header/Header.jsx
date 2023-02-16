import { useRouter } from "next/router";
import React, { useCallback, useContext, useMemo, useState } from "react";
import styles from "./header.module.css";
import { UserContext } from "../../providers/UserProvider";
import useAuthentication from "../../hooks/useAuthentication";
import Logo from "../logo";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { login, logout } = useAuthentication();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback(
    (label) => () => {
      const homeRoute = label === "Home" ? (!!user ? "/home" : "/") : undefined;
      router.push(homeRoute ?? `/${label.toLowerCase()}`);
      setIsMenuOpen(false);
    },
    [user]
  );

  const navItems = useMemo(() => {
    return [
      { label: "Home" },
      { label: "Features" },
      // { label: "Pricing" },
      { label: "Contacts" },
    ];
  }, []);

  const menuIconClass = useMemo(() => {
    if (isMenuOpen) {
      return `${styles.menuIcon} ${styles.open}`;
    } else {
      return styles.menuIcon;
    }
  }, [isMenuOpen]);

  const handleStartButtonClick = useCallback(() => {
    if (!!user) {
      logout();
    } else {
      login();
    }
  }, [login, logout]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <ul className={`${styles.menu}${isMenuOpen ? styles.open : ""}`}>
          {navItems.map((el) => {
            return (
              <li
                key={el.label}
                onClick={handleMenuItemClick(el.label)}
                className={styles.menuItem}
              >
                {el.label}
              </li>
            );
          })}
        </ul>
        <div
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={menuIconClass}
        >
          <span></span>
        </div>
      </nav>
      <div className={styles.welcomeWrapper}>
        {!!user ? (
          <p
            className={styles.welcome}
          >{`Welcome ${user.user?.providerData?.[0]?.displayName}!`}</p>
        ) : (
          <></>
        )}
        <button className={styles.ctaButton} onClick={handleStartButtonClick}>
          {!!user ? "Logout" : "Get Started"}
        </button>
      </div>
    </header>
  );
};

export default Header;
