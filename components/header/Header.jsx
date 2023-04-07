import { useRouter } from "next/router";
import React, { useCallback, useContext, useMemo, useState } from "react";
import styles from "./header.module.css";
import { UserContext } from "../../providers/UserProvider";
import useFirebase from "../../hooks/useFirebase";
import Logo from "../logo";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { login, logout } = useFirebase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
    login();
  }, [login]);

  const handleProfileIconClick = useCallback(() => {
    setIsProfileMenuOpen((prev) => !prev);
  }, []);

  const navigate = useCallback(
    (routeName) => {
      if (router.route === `/${routeName}`) {
        setIsProfileMenuOpen(false);
      }
      router.push(routeName.toLowerCase());
    },
    [router]
  );

  const profileMenuOptions = useMemo(
    () => [
      { title: "Your prompts", action: () => navigate("prompts") },
      { title: "Logout", action: logout },
    ],
    [logout, navigate]
  );

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
        {!!!user ? (
          <button className={styles.ctaButton} onClick={handleStartButtonClick}>
            {"Get Started"}
          </button>
        ) : (
          <BsPersonCircle
            onClick={handleProfileIconClick}
            size={25}
            className={styles.profileIcon}
          />
        )}
      </div>
      {isProfileMenuOpen && (
        <div className={styles.profileMenu}>
          {profileMenuOptions.map((el, ind) => {
            return (
              <div
                className={styles.profileMenuOption}
                key={`${el}-${ind}`}
                onClick={el.action}
                style={{ color: el.title === "Logout" ? "red" : "black" }}
              >
                {el.title}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
