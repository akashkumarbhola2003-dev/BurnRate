import { useNavigate } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found.</p>
      <button className={styles.btn} onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;