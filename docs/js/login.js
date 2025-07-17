document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("solarUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password.");
  }
});
