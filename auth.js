// Fonction login
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const errorBox = document.getElementById("error");

      fetch("http://localhost/APIlogin/checklogin.php?login="+username+"&password="+password)
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur de chargement des utilisateurs.");
          }
          return response.json();
        })
        .then(response => {
          if (response == "true") {
            window.location.href = "index.html";
          } else {
            errorBox.textContent = "Mauvais identifiants.";
          }
        })
        .catch(error => {
          console.error("Erreur:", error);
          errorBox.textContent = "Erreur lors de la connexion.";
        });
    });
  }
});

// Fonction à appeler dans index.html
function checkAuthOrRedirect() {
  if (localStorage.getItem("auth_ok") !== "true") {
    window.location.href = "login.html";
  }
}