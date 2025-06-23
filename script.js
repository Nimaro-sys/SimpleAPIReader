async function searchPlayer() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const player = data.find(p => p["Nom du joueur"].toLowerCase().includes(input));

    if (player) {
      resultDiv.innerHTML = `
        <h2>${player["Nom du joueur"]}</h2>
        <p><strong>SteamID64:</strong> ${player["SteamID64"]}</p>
        <p><strong>Profil Steam:</strong> <a href="${player["Profil Steam"]}" target="_blank">${player["Profil Steam"]}</a></p>
        <p><strong>Owner SteamID64:</strong> ${player["Owner SteamID64"]}</p>
        <p><strong>Identifiant SRP:</strong> ${player["Identifiant SRP"]}</p>
        <p><strong>Identifiant Discord:</strong> ${player["Identifiant discord"]}</p>
        <p><strong>Argent:</strong> ${player["Argent"]}</p>
        <p><strong>Nombre d'heures de jeux:</strong> ${player["Nombre d'heures de jeux"]}</p>
        <p><strong>Date de création du compte:</strong> ${player["Date de création du compte"]}</p>
        <p><strong>Dernière connexion:</strong> ${player["Dernière connexion"]}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p>Aucun joueur trouvé 😓</p>";
    }

  } catch (error) {
    console.error("Erreur lors du chargement JSON:", error);
    resultDiv.innerHTML = "<p>Erreur de chargement des données.</p>";
  }
}