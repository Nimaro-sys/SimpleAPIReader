const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

function getFromCache(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const data = JSON.parse(raw);
  if (Date.now() - data.timestamp > CACHE_DURATION_MS) {
    localStorage.removeItem(key);
    return null;
  }
  return data.value;
}

function saveToCache(key, value) {
  localStorage.setItem(key, JSON.stringify({
    value,
    timestamp: Date.now()
  }));
}

async function fetchPlayer() {
  const id = document.getElementById('playerId').value.trim();
  const output = document.getElementById('output');
  const error = document.getElementById('error');
  output.innerHTML = '';
  error.textContent = '';

  if (!id) {
    error.textContent = "⛔ Merci d'entrer un identifiant.";
    return;
  }

  const cacheKey = `player_${id}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    displayPlayerData(cached);
    return;
  }

  try {
    const res = await fetch(`https://api.simple-roleplay.fr/public/user.php?id=${encodeURIComponent(id)}`);
    if (!res.ok) {
      error.textContent = res.status === 404 ? "🚫 Joueur non trouvé." : "⚠️ Erreur de requête.";
      return;
    }
    const data = await res.json();
    saveToCache(cacheKey, data);
    displayPlayerData(data);
  } catch (e) {
    console.error(e);
    error.textContent = "💥 Erreur inattendue.";
  }
}

function displayPlayerData(data) {
  const output = document.getElementById('output');
  output.innerHTML = `
    <p><strong>Nom RP :</strong> ${data.name}</p>
    <p><strong>SteamID64 :</strong> ${data.steamid64}</p>
    <p><strong>Discord ID :</strong> ${data.discordId || 'Non renseigné'}</p>
    <p><strong>Admin :</strong> ${data.isAdmin ? '✅ Oui' : '❌ Non'}</p>
    <p><strong>Super Admin :</strong> ${data.isSuperAdmin ? '✅ Oui' : '❌ Non'}</p>
    <p><strong>Chef de Police :</strong> ${data.isPoliceChief ? '✅ Oui' : '❌ Non'}</p>
    <p style="font-size: 0.9rem; opacity: 0.6;">Données récupérées à ${new Date().toLocaleTimeString()}</p>
  `;
}
