// admin.js

const user = JSON.parse(localStorage.getItem("solarUser"));
if (!user || user.email !== "admin@solarpower.com") {
  alert("Access denied");
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("solarUsers")) || [];

const userList = document.getElementById("userList");
userList.innerHTML = "";

users.forEach(u => {
  const li = document.createElement("li");
  const total = u.deposits?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
  const referrals = users.filter(ref => ref.ref === u.wallet).map(ref => ref.username).join(", ") || "None";

  li.innerHTML = `
    <strong>${u.username}</strong> (${u.email})<br/>
    Wallet: ${u.wallet}<br/>
    Total Deposited: <b>${total} USDT</b><br/>
    Referrals (Level 1): ${referrals}
    <hr/>
  `;
  userList.appendChild(li);
});
