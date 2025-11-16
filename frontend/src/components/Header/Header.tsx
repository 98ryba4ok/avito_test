import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Главная
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Статистика
          </NavLink>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
