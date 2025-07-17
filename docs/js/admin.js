// admin.js

const adminWallet = "0x124377FCe14439248a4959ce528314aA3A897321"; // schimbi dacă vrei alt wallet

const user = JSON.parse(localStorage.getItem("solarUser"));
if (!user || user.wallet !== adminWallet) {
  alert("Access denied.");
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("solarUsers")) || [];

// Pending deposits
const pendingTable = document.querySelector("#pendingDepositsTable tbody");
users.forEach(u => {
  u.deposits?.forEach((d, i) => {
    if (d.status === "pending") {
      const row = pendingTable.insertRow();
      row.innerHTML = `
        <td>${u.email}</td>
        <td>${d.amount} USDT</td>
        <td>
          <button onclick="approveDeposit('${u.wallet}', ${i})">Approve</button>
          <button onclick="rejectDeposit('${u.wallet}', ${i})">Reject</button>
        </td>
      `;
    }
  });
});

// Withdrawal requests
const withdrawTable = document.querySelector("#withdrawalsTable tbody");
users.forEach(u => {
  u.withdrawals?.forEach((w, i) => {
    const row = withdrawTable.insertRow();
    row.innerHTML = `
      <td>${u.email}</td>
      <td>${w.amount} USDT</td>
      <td>${w.status}</td>
      <td>
        ${w.status === "pending" ? `
          <button onclick="approveWithdraw('${u.wallet}', ${i})">Approve</button>
          <button onclick="rejectWithdraw('${u.wallet}', ${i})">Reject</button>` : `—`}
      </td>
    `;
  });
});

function approveDeposit(wallet, index) {
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const user = users.find(u => u.wallet === wallet);
  if (user) {
    user.deposits[index].status = "confirmed";
    localStorage.setItem("solarUsers", JSON.stringify(users));
    location.reload();
  }
}

function rejectDeposit(wallet, index) {
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const user = users.find(u => u.wallet === wallet);
  if (user) {
    user.deposits[index].status = "rejected";
    localStorage.setItem("solarUsers", JSON.stringify(users));
    location.reload();
  }
}

function approveWithdraw(wallet, index) {
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const user = users.find(u => u.wallet === wallet);
  if (user) {
    user.withdrawals[index].status = "successful";
    localStorage.setItem("solarUsers", JSON.stringify(users));
    location.reload();
  }
}

function rejectWithdraw(wallet, index) {
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const user = users.find(u => u.wallet === wallet);
  if (user) {
    user.withdrawals[index].status = "rejected";
    localStorage.setItem("solarUsers", JSON.stringify(users));
    location.reload();
  }
}

// Referral stats
const referralDiv = document.getElementById("referralStats");
let totalReferrals = 0;
let totalCommission = 0;

users.forEach(u => {
  if (u.referredBy === adminWallet) {
    totalReferrals++;
    u.deposits?.forEach(dep => {
      if (dep.status === "confirmed") {
        totalCommission += dep.amount * 0.02; // 2% direct
      }
    });
  }

  const inviter = users.find(inv => inv.wallet === u.referredBy);
  if (inviter?.referredBy === adminWallet) {
    u.deposits?.forEach(dep => {
      if (dep.status === "confirmed") {
        totalCommission += dep.amount * 0.01; // 1% indirect
      }
    });
  }
});

referralDiv.innerHTML = `
  <p><strong>Total Referrals (L1+L2):</strong> ${totalReferrals}</p>
  <p><strong>Total Commissions Earned:</strong> ${totalCommission.toFixed(2)} USDT</p>
`;
