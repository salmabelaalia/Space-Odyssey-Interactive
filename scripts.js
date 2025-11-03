// ===============================
// Projet : Missions Spatiales Interactives
// Objectif : Manipuler le DOM, gÃ©rer des donnÃ©es JSON,
// et ajouter des fonctionnalitÃ©s dynamiques avec JavaScript.
// ===============================
const searchInput = document.querySelector("#search-input")
const searchResult = document.querySelector(".tech-grid")

// --- DonnÃ©es principales ---
let missions = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ===============================
// 1. CHARGEMENT DES DONNÃ‰ES
// ===============================
async function loadMissions() {
  try {
    const response = await fetch('missions.json');
    missions = await response.json();

    missions = orderList(missions)
    createMissionList(missions)
    // TODO: Afficher les missions au chargement
    // Utilise la fonction displayMissions(missions)

  } catch (error) {
    console.error("Erreur lors du chargement des missions :", error);
  }
}

loadMissions()

function orderList(data) {
    return data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

function createMissionList(missionsList) {
  searchResult.innerHTML = ''; // vider le container avant d'ajouter
  missionsList.forEach(mission => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <div class="tech-card">
        <img alt="${mission.name}" class="tech-card-image" src="${mission.image}" />
        <div class="tech-card-content">
          <h2 class="tech-card-title">${mission.name}</h2>
          <p class="tech-card-description">${mission.agency}</p>
          <p class="tech-card-description">${mission.launchDate}</p>
          <p class="tech-card-description">${mission.objective}</p>
        </div>
      </div>
    `;
    searchResult.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', loadMissions);

// ===============================
// 2. AFFICHAGE DES MISSIONS
// ===============================
function displayMissions(list) {
  const container = document.getElementById('missions-container');
  container.innerHTML = '';

  // TODO: Boucler sur la liste des missions et crÃ©er dynamiquement des cartes
  // Exemple :
  // list.forEach(mission => { ... })
  // Utilise innerHTML pour afficher : image, nom, agence, objectif, date + bouton Favori
}

// ===============================
// 3. RECHERCHE ET FILTRAGE
// ===============================
function searchMissions(keyword) {
  // TODO: Filtrer les missions selon le nom ou lâ€™objectif
  // Utilise la mÃ©thode .filter() sur le tableau missions
}

function filterByAgency(agency) {
  // TODO: Filtrer selon lâ€™agence sÃ©lectionnÃ©e dans un menu dÃ©roulant
  // Si "all" est sÃ©lectionnÃ©, afficher toutes les missions
}

// ===============================
// 4. FAVORIS (Bonus)
// ===============================
function toggleFavorite(id) {
  // TODO: Ajouter ou retirer un favori selon sâ€™il est dÃ©jÃ  dans la liste
  // Mets Ã  jour le localStorage aprÃ¨s chaque modification
  // Affiche un message ou un style visuel (Ã©toile jaune, etc.)
}

// ===============================
// 5. CRUD - AJOUT, Ã‰DITION, SUPPRESSION
// ===============================

// --- AJOUT ---
function addMission(newMission) {
  // TODO: Ajouter une nouvelle mission Ã  la liste
  // VÃ©rifie les champs avec une validation de base avant lâ€™ajout
  // Mets Ã  jour lâ€™affichage
}

// --- Ã‰DITION ---
function editMission(id, updatedData) {
  // TODO: Trouver la mission correspondante et modifier ses donnÃ©es
  // Mets Ã  jour lâ€™affichage
}

// --- SUPPRESSION ---
function deleteMission(id) {
  // TODO: Supprimer une mission aprÃ¨s confirmation (window.confirm)
  // Mets Ã  jour lâ€™affichage
}

// ===============================
// 6. VALIDATION DE FORMULAIRE
// ===============================
function validateForm(data) {
  // TODO: VÃ©rifier que tous les champs obligatoires sont remplis
  // BONUS : Utiliser Regex pour valider les emails et formats de dates
  // Retourne true ou false
}

// ===============================
// 7. INITIALISATION ET Ã‰VÃ‰NEMENTS
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Charger les missions
  loadMissions();

  // 2. Ã‰vÃ©nements :
  // - Recherche (input)
  // - Filtrage (select)
  // - Favoris (clic sur bouton)
  // - CRUD (formulaires dâ€™ajout/Ã©dition/suppression)
  
  // TODO: Ajouter les Ã©couteurs dâ€™Ã©vÃ©nements ici
  // Exemple :
  // document.getElementById('search').addEventListener('input', (e) => searchMissions(e.target.value))
});
