import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  // Helper to apply active class — useLocation gives us the current path
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logo}>💳</span>
        <span className={styles.brandName}>SubTrackr</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={isActive("/") ? styles.active : ""}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/subscriptions"
            className={isActive("/subscriptions") ? styles.active : ""}
          >
            Subscriptions
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={isActive("/history") ? styles.active : ""}
          >
            History
          </Link>
        </li>
        <li>
          <Link to="/add" className={`${styles.addBtn} ${isActive("/add") ? styles.active : ""}`}>
            + Add New
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;