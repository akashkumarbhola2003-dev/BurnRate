import { useSubscriptionContext } from "../context/SubscriptionContext";
import useSubscriptionSummary from "../hooks/useSubscriptionSummary";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const { subscriptions, loading, error } = useSubscriptionContext();

  // Custom hook — all useMemo calculations live here
  const {
    totalMonthly,
    totalYearly,
    activeCount,
    pausedCount,
    cancelledCount,
    upcomingRenewals,
    categoryBreakdown,
  } = useSubscriptionSummary(subscriptions);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className={styles.dashboard}>
      <h4 className={styles.pageTitle}>Dashboard</h4>

      {/* Renewal Alert Banner */}
      {upcomingRenewals.length > 0 && (
        <div className={styles.alertBanner}>
          🔔 {upcomingRenewals.length} subscription{upcomingRenewals.length > 1 ? "s" : ""} renewing within 7 days:{" "}
          {upcomingRenewals.map((s) => s.name).join(", ")}
        </div>
      )}

      {/* Summary Cards */}
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Monthly Spend</span>
          <span className={styles.cardValue}>₹{totalMonthly.toFixed(0)}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Yearly Projection</span>
          <span className={styles.cardValue}>₹{totalYearly.toFixed(0)}</span>
        </div>
        <div className={`${styles.card} ${styles.activeCard}`}>
          <span className={styles.cardLabel}>Active</span>
          <span className={styles.cardValue}>{activeCount}</span>
        </div>
        <div className={`${styles.card} ${styles.pausedCard}`}>
          <span className={styles.cardLabel}>Paused</span>
          <span className={styles.cardValue}>{pausedCount}</span>
        </div>
        <div className={`${styles.card} ${styles.cancelledCard}`}>
          <span className={styles.cardLabel}>Cancelled</span>
          <span className={styles.cardValue}>{cancelledCount}</span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className={styles.section}>
        <h6 className={styles.sectionTitle}>Monthly Spend by Category</h6>
        <div className={styles.categoryList}>
          {Object.entries(categoryBreakdown).map(([cat, amount]) => (
            <div key={cat} className={styles.categoryRow}>
              <span className={styles.catName}>{cat}</span>
              <span className={styles.catAmount}>₹{amount.toFixed(0)}/mo</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Renewals Detail */}
      {upcomingRenewals.length > 0 && (
        <div className={styles.section}>
          <h6 className={styles.sectionTitle}>Renewing This Week</h6>
          {upcomingRenewals.map((s) => {
            const daysLeft = Math.ceil(
              (new Date(s.nextBilling) - new Date()) / (1000 * 60 * 60 * 24)
            );
            return (
              <div key={s.id} className={styles.renewalRow}>
                <span>{s.name}</span>
                <span>₹{s.amount}</span>
                <span className={styles.daysLeft}>
                  {daysLeft === 0 ? "Today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;