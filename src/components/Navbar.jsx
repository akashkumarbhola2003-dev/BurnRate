import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logo}>🔥</span>
        <span className={styles.brandName}>Burn<span className={styles.rate}>Rate</span></span>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/" className={isActive("/") ? styles.active : ""}>Dashboard</Link></li>
        <li><Link to="/subscriptions" className={isActive("/subscriptions") ? styles.active : ""}>Subscriptions</Link></li>
        <li><Link to="/history" className={isActive("/history") ? styles.active : ""}>History</Link></li>
        <li><Link to="/add" className={`${styles.addBtn} ${isActive("/add") ? styles.addActive : ""}`}>+ Add New</Link></li>

        {user && (
          <li className={styles.userMenu}>
            <span className={styles.username}>👤 {user.username}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;