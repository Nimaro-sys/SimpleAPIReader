const VALID_USERNAME = "Tom";
const VALID_PASSWORD_HASH = "802fbf9a6c7e74812c37c420e1dc399dd3b7d170f305f14dd8a15a6b3f7721f6"; // hash de "Lavachette"

async function hashText(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = "";

  const hash = await hashText(pass);
  if (user === VALID_USERNAME && hash === VALID_PASSWORD_HASH) {
    localStorage.setItem("auth_ok", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "Mauvais identifiants.";
  }
}

function checkAuthOrRedirect() {
  if (localStorage.getItem("auth_ok") !== "true") {
    window.location.href = "login.html";
  }
}
