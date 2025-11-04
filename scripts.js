// ===============================
// Projet : Missions Spatiales Interactives
// Objectif : Manipuler le DOM, gÃ©rer des donnÃ©es JSON,
// et ajouter des fonctionnalitÃ©s dynamiques avec JavaScript.
// ===============================
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector(".tech-grid");

// --- DonnÃ©es principales ---
let missions = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ===============================
// 1. CHARGEMENT DES DONNÃ‰ES
// ===============================
async function loadMissions() {
  try {
    const response = await fetch("missions.json");
    missions = await response.json();
    missions = orderList(missions);
    createMissionList(missions);
    // TODO: Afficher les missions au chargement
    // Utilise la fonction displayMissions(missions)
  } catch (error) {
    console.error("Erreur lors du chargement des missions :", error);
  }
}

function orderList(data) {
  return data.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

function createMissionList(missionsList) {
  searchResult.innerHTML = ""; // vider le container avant d'ajouter

  missionsList.forEach((mission) => {
    const isFav = favorites.includes(mission.id);

    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <div class="tech-card">

        <div class="card-actions">

          <i class="favorite-star ${isFav ? "fa-solid" : "fa-regular"} fa-star" 
             data-id="${mission.id}"></i>

          <div class="menu-wrapper">
            <i class="fa-solid fa-ellipsis-vertical menu-btn"></i>
            <div class="menu-dropdown">
              <button class="edit-btn" data-id="${mission.id}">Modifier</button>
              <button class="delete-btn" data-id="${
                mission.id
              }">Supprimer</button>
            </div>
          </div>

        </div>

        <img alt="${mission.name}" class="tech-card-image" src="${
      mission.image
    }" />
        <div class="tech-card-content">
          <span class="te²ch-card-category">Article ${mission.id}</span>
          <h2 class="tech-card-title">${mission.name}</h2>
          <p class="tech-card-description"><strong>Agency : </strong>${
            mission.agency
          }</p>
          <p class="tech-card-description"><strong>Launch Date : </strong>${
            mission.launchDate
          }</p>
          <p class="tech-card-description"><strong>Objective : </strong>${
            mission.objective
          }</p>
        </div>

      </div>
    `;

    // AFFICHER lE MENU
    const menuBtn = listItem.querySelector(".menu-btn");
    const menuDropdown = listItem.querySelector(".menu-dropdown");

    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // pour ne pas fermer immédiatement
      menuDropdown.style.display =
        menuDropdown.style.display === "flex" ? "none" : "flex";
    });

    // Fermer le menu si on clique ailleurs sur la page
    document.addEventListener("click", () => {
      menuDropdown.style.display = "none";
    });

    // GESTION FAVORIS
    const star = listItem.querySelector(".favorite-star");

    star.addEventListener("click", () => {
      const id = mission.id;

      // Si déjà favori → enlever
      if (favorites.includes(id)) {
        favorites = favorites.filter((fav) => fav !== id);
        star.classList.remove("fa-solid", "active");
        star.classList.add("fa-regular");
      }

      // Sinon → ajouter
      else {
        favorites.push(id);
        star.classList.add("fa-solid", "active");
        star.classList.remove("fa-regular");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    searchResult.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", loadMissions);

// ===============================
// 2. AFFICHAGE DES MISSIONS
// ===============================
function displayMissions(list) {
  const container = document.getElementById("missions-container");
  container.innerHTML = "";

  // TODO: Boucler sur la liste des missions et crÃ©er dynamiquement des cartes
  // Exemple :
  // list.forEach(mission => { ... })
  // Utilise innerHTML pour afficher : image, nom, agence, objectif, date + bouton Favori
}

// ===============================
// 3. RECHERCHE ET FILTRAGE
// ===============================
searchInput.addEventListener("input", searchMissions);

function searchMissions(keyword) {
  // TODO: Filtrer les missions selon le nom ou lâ€™objectif
  // Utilise la mÃ©thode .filter() sur le tableau missions
  searchResult.innerHTML = "";

  const searchedString = keyword.target.value.toLowerCase();
  const filtereArr = missions.filter(
    (e1) =>
      e1.name.toLowerCase().includes(searchedString) ||
      e1.launchDate.includes(searchedString) ||
      e1.agency.toLowerCase().includes(searchedString) ||
      e1.objective.toLowerCase().includes(searchedString) ||
      e1.id.toString().includes(searchedString)
  );
  createMissionList(filtereArr);
}

// === ACTIVER LES FILTRES ===
document
  .getElementById("filter-agency")
  .addEventListener("change", applyFilters);
document.getElementById("launchYear").addEventListener("change", applyFilters);
document.getElementById("missionType").addEventListener("change", applyFilters);

function applyFilters() {
  const agencySelected = document.getElementById("filter-agency").value;
  const yearSelected = document.getElementById("launchYear").value;
  const typeSelected = document.getElementById("missionType").value;

  let filtered = missions;

  // Filtre par agence
  if (agencySelected !== "all") {
    filtered = filtered.filter((m) =>
      m.agency.toLowerCase().includes(agencySelected.toLowerCase())
    );
  }

  // Filtre par année
  if (yearSelected !== "") {
    filtered = filtered.filter((m) => m.launchDate.startsWith(yearSelected));
  }

  // Filtre par type de mission
  if (typeSelected !== "") {
    filtered = filtered.filter((m) =>
      m.agency.toLowerCase().includes(typeSelected.toLowerCase())
    );
  }

  createMissionList(filtered);
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
document.addEventListener("DOMContentLoaded", () => {
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
