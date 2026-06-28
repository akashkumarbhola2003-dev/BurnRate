import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { toast } from "react-toastify";
import styles from "../styles/Form.module.css";

const CATEGORIES = ["Entertainment", "Fitness", "Tools", "Education", "Other"];

const defaultForm = {
  name: "",
  amount: "",
  cycle: "monthly",
  category: "Entertainment",
  status: "active",
  startDate: "",
  nextBilling: "",
  notes: "",
};

const AddSubscription = () => {
  const { addSubscription } = useSubscriptionContext();
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation — manual, no library
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Subscription name is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = "Enter a valid amount greater than 0";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.nextBilling) newErrors.nextBilling = "Next billing date is required";
    if (form.nextBilling && form.startDate && form.nextBilling < form.startDate)
      newErrors.nextBilling = "Next billing date must be after start date";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await addSubscription({ ...form, amount: Number(form.amount) });
    toast.success(`${form.name} added successfully!`);
    navigate("/subscriptions");
  };

  return (
    <div className={styles.formPage}>
      <h4 className={styles.pageTitle}>Add Subscription</h4>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label>Subscription Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Netflix, Spotify"
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 649"
            />
            {errors.amount && <span className={styles.error}>{errors.amount}</span>}
          </div>
          <div className={styles.field}>
            <label>Billing Cycle</label>
            <select name="cycle" value={form.cycle} onChange={handleChange}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
          </div>
          <div className={styles.field}>
            <label>Next Billing Date</label>
            <input
              type="date"
              name="nextBilling"
              value={form.nextBilling}
              onChange={handleChange}
            />
            {errors.nextBilling && <span className={styles.error}>{errors.nextBilling}</span>}
          </div>
        </div>

        <div className={styles.field}>
          <label>Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any extra info about this subscription"
            rows={2}
          />
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate("/subscriptions")}>
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            Add Subscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscription;