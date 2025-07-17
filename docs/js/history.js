// /docs/js/history.js

function renderHistory() {
  const user = JSON.parse(localStorage.getItem("solarUser"));
  if (!user) return;

  const depositList = document.getElementById("depositHistory");
  const withdrawList = document.getElementById("withdrawHistory");

  depositList.innerHTML = "";
  withdrawList.innerHTML = "";

  user.deposits.forEach(deposit => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${deposit.amount} USDT</strong> - ${deposit.date} 
      <span class="status ${deposit.status}">${deposit.status}</span>
    `;
    depositList.appendChild(li);
  });

  user.withdrawals.forEach(withdraw => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${withdraw.amount} USDT</strong> - ${withdraw.date}
      <span class="status ${withdraw.status}">${withdraw.status}</span>
    `;
    withdrawList.appendChild(li);
  });
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
  renderHistory();
});
