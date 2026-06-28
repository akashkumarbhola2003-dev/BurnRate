import { useMemo } from "react";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { toast } from "react-toastify";
import styles from "../styles/History.module.css";

const History = () => {
  const { subscriptions, changeStatus, deleteSubscription, loading } =
    useSubscriptionContext();

  // useMemo — only recalculates when subscriptions change
  const cancelledSubs = useMemo(() => {
    return subscriptions.filter((s) => s.status === "cancelled");
  }, [subscriptions]);

  const handleRestore = async (id, name) => {
    await changeStatus(id, "active");
    toast.success(`${name} restored to active`);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Permanently delete "${name}"?`)) {
      await deleteSubscription(id);
      toast.error(`${name} permanently deleted`);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className={styles.page}>
      <h4 className={styles.pageTitle}>History</h4>
      <p className={styles.subtitle}>Cancelled subscriptions. Restore to make them active again.</p>

      {cancelledSubs.length === 0 ? (
        <div className={styles.empty}>
          <p>No cancelled subscriptions yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {cancelledSubs.map((sub) => (
            <div key={sub.id} className={styles.card}>
              <div className={styles.info}>
                <span className={styles.name}>{sub.name}</span>
                <span className={styles.meta}>
                  {sub.category} · ₹{sub.amount}/{sub.cycle}
                </span>
                {sub.notes && <span className={styles.notes}>{sub.notes}</span>}
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.restoreBtn}
                  onClick={() => handleRestore(sub.id, sub.name)}
                >
                  Restore
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(sub.id, sub.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;