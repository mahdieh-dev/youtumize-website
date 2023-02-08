import React, { useCallback, useMemo, useState } from "react";
import styles from "./header.module.css";

const Header = ({ onMenuStateChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleMenuItemClick = useCallback(
    (ind) => {
      onMenuStateChange(ind);
      setIsMenuOpen(false);
    },
    [onMenuStateChange]
  );

  const navItems = useMemo(() => {
    return [
      { label: "Home", onClick: () => handleMenuItemClick(1) },
      { label: "Features", onClick: () => handleMenuItemClick(2) },
      { label: "Pricing", onClick: () => handleMenuItemClick(3) },
      { label: "Contact", onClick: () => handleMenuItemClick(4) },
    ];
  }, [handleMenuItemClick]);

  const menuIconClass = useMemo(() => {
    if (isMenuOpen) {
      return `${styles.menuIcon} ${styles.open}`;
    } else {
      return styles.menuIcon;
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Youtumize</div>
        <ul className={`${styles.menu}${isMenuOpen ? styles.open : ""}`}>
          {navItems.map((el, ind) => {
            return (
              <li key={ind} onClick={el.onClick} className={styles.menuItem}>
                {el.label}
              </li>
            );
          })}
        </ul>
        <button className={styles.ctaButton}>Get Started</button>
        <div
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={menuIconClass}
        >
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
