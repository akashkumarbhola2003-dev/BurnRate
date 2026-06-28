import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { toast } from "react-toastify";
import styles from "../styles/Subscription.module.css";

const CATEGORIES = ["All", "Entertainment", "Fitness", "Tools", "Education", "Other"];
const STATUSES = ["All", "active", "paused"];

const Subscriptions = () => {
  const { subscriptions, deleteSubscription, changeStatus, loading } =
    useSubscriptionContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // useMemo — filtered list only recalculates when dependencies change
  const filteredSubs = useMemo(() => {
    return subscriptions
      .filter((s) => s.status !== "cancelled")
      .filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((s) =>
        selectedCategory === "All" ? true : s.category === selectedCategory
      )
      .filter((s) =>
        selectedStatus === "All" ? true : s.status === selectedStatus
      );
  }, [subscriptions, searchTerm, selectedCategory, selectedStatus]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await deleteSubscription(id);
      toast.error(`${name} deleted`);
    }
  };

  const handleStatusChange = async (id, currentStatus, name) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    await changeStatus(id, newStatus);
    toast.success(`${name} marked as ${newStatus}`);
  };

  const handleCancelSub = async (id, name) => {
    if (window.confirm(`Cancel "${name}"? It will move to History.`)) {
      await changeStatus(id, "cancelled");
      toast.info(`${name} moved to History`);
    }
  };

  const handleEdit = (sub) => {
    // Passing subscription data via navigate state — no useParams needed
    navigate("/edit", { state: { sub } });
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4 className={styles.pageTitle}>Subscriptions</h4>
        <button className={styles.addBtn} onClick={() => navigate("/add")}>
          + Add New
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className={styles.select}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className={styles.resultCount}>
        Showing {filteredSubs.length} subscription{filteredSubs.length !== 1 ? "s" : ""}
      </p>

      {/* Subscriptions List */}
      {filteredSubs.length === 0 ? (
        <div className={styles.empty}>
          <p>No subscriptions found. Try adjusting filters or add a new one.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredSubs.map((sub) => {
            const daysLeft = Math.ceil(
              (new Date(sub.nextBilling) - new Date()) / (1000 * 60 * 60 * 24)
            );
            return (
              <div key={sub.id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <span className={styles.subName}>{sub.name}</span>
                  <span className={styles.subCategory}>{sub.category}</span>
                  {sub.notes && <span className={styles.notes}>{sub.notes}</span>}
                </div>
                <div className={styles.cardMiddle}>
                  <span className={styles.amount}>₹{sub.amount}</span>
                  <span className={styles.cycle}>/ {sub.cycle}</span>
                  <span className={styles.billing}>
                    Next: {sub.nextBilling} ({daysLeft >= 0 ? `${daysLeft}d left` : "overdue"})
                  </span>
                </div>
                <div className={styles.cardRight}>
                  <span className={`${styles.badge} ${styles[sub.status]}`}>
                    {sub.status}
                  </span>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(sub)}>
                      Edit
                    </button>
                    <button
                      className={styles.toggleBtn}
                      onClick={() => handleStatusChange(sub.id, sub.status, sub.name)}
                    >
                      {sub.status === "active" ? "Pause" : "Activate"}
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => handleCancelSub(sub.id, sub.name)}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(sub.id, sub.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;