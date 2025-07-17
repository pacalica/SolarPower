// referral.js

const user = JSON.parse(localStorage.getItem("solarUser"));
if (!user) {
  window.location.href = "index.html";
}

document.getElementById("refLink").value =
  window.location.origin + window.location.pathname.replace("referral.html", "signup.html") + "?ref=" + user.wallet;

const users = JSON.parse(localStorage.getItem("solarUsers")) || [];

const level1 = users.filter(u => u.ref === user.wallet);
const level2 = users.filter(u => level1.some(l1 => u.ref === l1.wallet));

function renderList(list, elementId) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";

  if (list.length === 0) {
    ul.innerHTML = "<li>No referrals</li>";
    return;
  }

  list.forEach(u => {
    const total = u.deposits?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
    const li = document.createElement("li");
    li.textContent = `${u.username} - ${total} USDT`;
    ul.appendChild(li);
  });
}

renderList(level1, "level1List");
renderList(level2, "level2List");
