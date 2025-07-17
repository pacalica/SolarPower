// referral.js

const user = JSON.parse(localStorage.getItem("solarUser"));
const allUsers = JSON.parse(localStorage.getItem("solarUsers")) || [];

if (!user) {
  alert("Not logged in.");
  window.location.href = "index.html";
}

const refLink = `${window.location.origin}/signup.html?ref=${user.wallet}`;
document.getElementById("refLink").value = refLink;

function copyRef() {
  navigator.clipboard.writeText(refLink);
  alert("Referral link copied!");
}

const level1 = allUsers.filter(u => u.referredBy === user.wallet);
const level2 = allUsers.filter(u => level1.some(l1 => u.referredBy === l1.wallet));

const level1List = document.getElementById("level1List");
const level2List = document.getElementById("level2List");

level1.forEach(u => {
  const li = document.createElement("li");
  li.textContent = `${u.email} - ${u.wallet}`;
  level1List.appendChild(li);
});

level2.forEach(u => {
  const li = document.createElement("li");
  li.textContent = `${u.email} - ${u.wallet}`;
  level2List.appendChild(li);
});
