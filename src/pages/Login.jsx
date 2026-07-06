import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import styles from "../styles/Auth.module.css";

const Login = () => {
  const { login, loading } = useAuthContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await login(form.username, form.password);

console.log("result:", result);        // ADD THIS

    if (result.success) {
      toast.success(`Welcome back, ${form.username}!`);
     setTimeout(()=> navigate("/splash"),1000);
    } else {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandRow}>
          <span className={styles.brandFire}>🔥</span>
          <span className={styles.brandText}>Burn<span>Rate</span></span>
        </div>

        <h4 className={styles.title}>Welcome back</h4>
        <p className={styles.subtitle}>Sign in to track your subscriptions</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. akash_kumar"
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.toggleText}>
          Don't have an account? <Link to="/register" className={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;