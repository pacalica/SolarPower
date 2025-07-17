// settings.js

const user = JSON.parse(localStorage.getItem("solarUser"));
if (!user) {
  window.location.href = "index.html";
}

document.getElementById("username").value = user.username;
document.getElementById("email").value = user.email;

document.getElementById("settingsForm").addEventListener("submit", e => {
  e.preventDefault();
  const newUsername = document.getElementById("username").value.trim();
  const newEmail = document.getElementById("email").value.trim();

  if (!newUsername || !newEmail) {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("solarUsers")) || [];
  const index = users.findIndex(u => u.wallet === user.wallet);
  if (index !== -1) {
    users[index].username = newUsername;
    users[index].email = newEmail;
    localStorage.setItem("solarUsers", JSON.stringify(users));

    const updatedUser = { ...user, username: newUsername, email: newEmail };
    localStorage.setItem("solarUser", JSON.stringify(updatedUser));
    alert("Updated successfully");
  }
});
