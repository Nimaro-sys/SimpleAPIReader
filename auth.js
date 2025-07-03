// Utilisateur/MDP autorisés
const VALID_USERNAME = "Tom";
// SHA-256 de "Lavachette"
const VALID_PASSWORD_HASH = "802fbf9a6c7e74812c37c420e1dc399dd3b7d170f305f14dd8a15a6b3f7721f6";

// Fonction de hash SHA-256
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Fonction login
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const errorBox = document.getElementById("error");

      const passwordHash = await hashText(password);

      if (username === VALID_USERNAME && passwordHash === VALID_PASSWORD_HASH) {
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
