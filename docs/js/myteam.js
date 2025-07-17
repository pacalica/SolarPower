// /docs/js/myteam.js

function loadTeam() {
  const user = JSON.parse(localStorage.getItem("solarUser"));
  const allUsers = JSON.parse(localStorage.getItem("solarUsers")) || [];

  const level1 = allUsers.filter(u => u.ref === user.wallet);
  const level2 = allUsers.filter(u => level1.some(l1 => u.ref === l1.wallet));

  const l1List = document.getElementById("level1List");
  const l2List = document.getElementById("level2List");

  l1List.innerHTML = "";
  l2List.innerHTML = "";

  level1.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.username} (${u.email})`;
    l1List.appendChild(li);
  });

  level2.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.username} (${u.email})`;
    l2List.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", loadTeam);
