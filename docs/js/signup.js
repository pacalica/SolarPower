// /docs/js/signup.js

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const ref = new URLSearchParams(window.location.search).get("ref") || null;

  if (!email || !password || !username) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulăm un wallet unic (înlocuiește cu conectare wallet reală dacă vrei)
  const wallet = "wallet_" + Math.random().toString(36).substring(2, 10);

  const user = {
    email,
    password,
    username,
    wallet,
    ref,
    deposits: [],
    withdrawals: [],
  };

  // Salvăm lista globală de utilizatori
  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  users.push(user);
  localStorage.setItem("solarUsers", JSON.stringify(users));

  // Salvăm userul curent pentru login automat
  localStorage.setItem("solarUser", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "dashboard.html";
});
