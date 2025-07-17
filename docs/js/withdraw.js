// /docs/js/withdraw.js

function loadBalance() {
  const user = JSON.parse(localStorage.getItem("solarUser"));
  const balanceEl = document.getElementById("userBalance");

  if (user && balanceEl) {
    const totalDeposits = user.deposits
      .filter(d => d.status === "confirmed")
      .reduce((sum, d) => sum + d.amount, 0);

    const totalWithdrawn = user.withdrawals
      .filter(w => w.status !== "rejected")
      .reduce((sum, w) => sum + w.amount, 0);

    const available = totalDeposits - totalWithdrawn;
    balanceEl.textContent = available.toFixed(2);
  }
}

function handleWithdrawRequest() {
  const user = JSON.parse(localStorage.getItem("solarUser"));
  if (!user) return;

  const amountInput = document.getElementById("withdrawAmount");
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount.");
    return;
  }

  const pending = user.withdrawals.find(w => w.status === "pending");
  if (pending) {
    alert("You already have a pending withdrawal.");
    return;
  }

  const now = new Date().toISOString();
  const withdrawal = {
    amount,
    date: now,
    status: "pending"
  };

  user.withdrawals.push(withdrawal);
  localStorage.setItem("solarUser", JSON.stringify(user));

  // Actualizăm și în lista globală
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const index = users.findIndex(u => u.email === user.email);
  if (index > -1) {
    users[index] = user;
    localStorage.setItem("solarUsers", JSON.stringify(users));
  }

  alert("Withdrawal request submitted.");
  amountInput.value = "";
  loadBalance();
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
  loadBalance();

  const btn = document.getElementById("requestWithdrawBtn");
  if (btn) {
    btn.addEventListener("click", handleWithdrawRequest);
  }
});
