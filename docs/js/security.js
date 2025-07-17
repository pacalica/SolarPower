// security.js

const user = JSON.parse(localStorage.getItem("solarUser"));
if (!user) {
  alert("Please log in first.");
  window.location.href = "index.html";
}

document.getElementById("passwordForm").addEventListener("submit", e => {
  e.preventDefault();
  const newPass = document.getElementById("newPassword").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value.trim();

  if (newPass.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const index = users.findIndex(u => u.wallet === user.wallet);
  if (index !== -1) {
    users[index].password = newPass;
    localStorage.setItem("solarUsers", JSON.stringify(users));
    alert("Password updated successfully.");
  } else {
    alert("User not found.");
  }
});
