import { useMemo } from "react";
const useSubscriptionSummary = (subscriptions) => {

  const totalMonthly = useMemo(() => {
    return subscriptions
      .filter((s) => s.status === "active")
      .reduce((acc, s) => {
        return acc + (s.cycle === "yearly" ? s.amount / 12 : s.amount);
      }, 0);
  }, [subscriptions]);

  const totalYearly = useMemo(() => {
    return subscriptions
      .filter((s) => s.status === "active")
      .reduce((acc, s) => {
        return acc + (s.cycle === "monthly" ? s.amount * 12 : s.amount);
      }, 0);
  }, [subscriptions]);

  const activeCount = useMemo(() => {
    return subscriptions.filter((s) => s.status === "active").length;
  }, [subscriptions]);

  const pausedCount = useMemo(() => {
    return subscriptions.filter((s) => s.status === "paused").length;
  }, [subscriptions]);

  const cancelledCount = useMemo(() => {
    return subscriptions.filter((s) => s.status === "cancelled").length;
  }, [subscriptions]);

  // Subscriptions renewing within the next 7 days
  const upcomingRenewals = useMemo(() => {
    const today = new Date();
    return subscriptions.filter((s) => {
      if (s.status !== "active") return false;
      const billing = new Date(s.nextBilling);
      const daysLeft = Math.ceil((billing - today) / (1000 * 60 * 60 * 24));
      return daysLeft >= 0 && daysLeft <= 7;
    });
  }, [subscriptions]);

  // Category-wise monthly spend (for breakdown display)
  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    subscriptions
      .filter((s) => s.status === "active")
      .forEach((s) => {
        const monthly = s.cycle === "yearly" ? s.amount / 12 : s.amount;
        breakdown[s.category] = (breakdown[s.category] || 0) + monthly;
      });
    return breakdown;
  }, [subscriptions]);

  return {
    totalMonthly,
    totalYearly,
    activeCount,
    pausedCount,
    cancelledCount,
    upcomingRenewals,
    categoryBreakdown,
  };
};

export default useSubscriptionSummary;