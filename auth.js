// Utilisateur/MDP autorisés en clair
const VALID_USERNAME = "Tom";
const VALID_PASSWORD = "Lavachette";

// Fonction login
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const errorBox = document.getElementById("error");

      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("auth_ok", "true");
        window.location.href = "index.html";
      } else {
        errorBox.textContent = "Mauvais identifiants.";
      }
    });
  }
});

// Fonction à appeler dans index.html
function checkAuthOrRedirect() {
  if (localStorage.getItem("auth_ok") !== "true") {
    window.location.href = "login.html";
  }
}