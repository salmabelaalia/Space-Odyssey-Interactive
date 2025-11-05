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
let currentTab = "all"; // "all" | "favorites" | "my missions"

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

          <i class="favorite-star ${isFav ? "fa-solid active" : "fa-regular"} fa-star" 
             data-id="${mission.id}"></i>
            
          <div class="menu-wrapper">
            <i class="fa-solid fa-ellipsis-vertical menu-btn"></i>
            <div class="menu-dropdown">
              <button class="edit-btn" data-id="${mission.id}">Modifier</button>
              <button class="delete-btn" data-id="${mission.id}">Supprimer</button>
            </div>
          </div>

        </div>

        <img alt="${mission.name}" class="tech-card-image" src="${mission.image}" />
        <div class="tech-card-content">
          <span class="tech-card-category">Article ${mission.id}</span>
          <h2 class="tech-card-title">${mission.name}</h2>
          <p class="tech-card-description"><strong>Agency : </strong>${mission.agency}</p>
          <p class="tech-card-description"><strong>Launch Date : </strong>${mission.launchDate}</p>
          <p class="tech-card-description"><strong>Objective : </strong>${mission.objective}</p>
        </div>

      </div>
    `;

    // ------------------------------
    // GESTION DU FAVORI
    // ------------------------------
    const star = listItem.querySelector(".favorite-star");
    star.addEventListener("click", () => {
      const id = mission.id;

      if (favorites.includes(id)) {
        // retirer des favoris
        favorites = favorites.filter((f) => f !== id);
        star.classList.remove("fa-solid", "active");
        star.classList.add("fa-regular");
      } else {
        // ajouter aux favoris
        favorites.push(id);
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid", "active");
      }

      // sauvegarder dans localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // si on est dans l'onglet favoris, rafraîchir l'affichage
      if (currentTab === "favorites") {
        showFavorites();
      }
    });

    // ------------------------------
    // MENU DROPDOWN
    // ------------------------------
    const menuBtn = listItem.querySelector(".menu-btn");
    const menuDropdown = listItem.querySelector(".menu-dropdown");

    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // pour ne pas fermer immédiatement
      menuDropdown.style.display =
        menuDropdown.style.display === "flex" ? "none" : "flex";
    });

    //  Fermer le menu si on clique ailleurs sur la page
    document.addEventListener("click", () => {
      menuDropdown.style.display = "none";
    });

    // Empêcher que le clic sur le menu ferme lui-même
    menuDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });    

    // Edit
    const editBtn = listItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => openEditModal(mission.id));

    // Delete
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Do you really want to delete this mission ?")) {
        deleteMission(mission.id);
      }
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

function searchMissions(event) {
  // TODO: Filtrer les missions selon le nom ou lâ€™objectif
  // Utilise la mÃ©thode .filter() sur le tableau missions
  const keyword = event.target.value.toLowerCase();

  let filtered = missions.filter(
    (m) =>
      m.name.toLowerCase().includes(keyword) ||
      m.launchDate.includes(keyword) ||
      m.agency.toLowerCase().includes(keyword) ||
      m.objective.toLowerCase().includes(keyword) ||
      m.id.toString().includes(keyword)
  );

  // si onglet favoris actif
  if (currentTab === "favorites") {
    filtered = filtered.filter((m) => favorites.includes(m.id));
  }

  createMissionList(filtered);
}

// === ACTIVER LES FILTRES ===
document.getElementById("filter-agency").addEventListener("change", applyFilters);
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

  if (currentTab === "favorites") {
    filtered = filtered.filter((m) => favorites.includes(m.id));
  }

  createMissionList(filtered);
}

// ===============================
// GESTION DES ONGLETS
// ===============================
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (index === 0) {
      currentTab = "all";
      createMissionList(missions);
    } else if (index === 1) {
      currentTab = "favorites";
      showFavorites();
    } else if (index === 2) {
      currentTab = "mine";
      // pour plus tard
    }
  });
});

// ===============================
// . AFFICHER UNIQUEMENT LES FAVORIS
// ===============================
function showFavorites() {
  const favMissions = missions.filter(m => favorites.includes(m.id));

  if (favMissions.length === 0) {
    searchResult.innerHTML = "<p style='color:white;'>Aucun favori</p>";
    return;
  }

  createMissionList(favMissions);
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
// FORMULAIRE AJOUT / EDITION
// Variables pour ajout mission : Sélection des éléments du modal
const addMissionBtn = document.querySelector(".btn-add-mission");
const missionModal = document.getElementById("missionModal");
const missionForm = document.getElementById("missionForm");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
let editingMissionId = null; // null = ajout, sinon édition

// Ouvrir le modal pour ajouter une nouvelle mission
addMissionBtn.addEventListener("click", () => {
    missionForm.reset(); // vider le formulaire
    editingMissionId = null; // mode ajout
    document.getElementById("modalTitle").textContent = "Ajouter une mission";
    missionModal.style.display = "flex";
});

function closeMissionModal() {
    missionModal.style.display = "none";
}

closeModalBtn.addEventListener("click", closeMissionModal);
cancelBtn.addEventListener("click", closeMissionModal);

// Fermer en cliquant à l’extérieur du modal
window.addEventListener("click", (e) => {
    if (e.target === missionModal) closeMissionModal();
});

// Soumission du formulaire : ajout ou modification
missionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const mission = {
        id: editingMissionId || missions.length + 1,
        name: document.getElementById("missionName").value,
        agency: document.getElementById("missionAgency").value,
        objective: document.getElementById("missionObjective").value,
        launchDate: document.getElementById("missionDate").value,
        image: document.getElementById("missionImage").value,
    };

    if (editingMissionId) {
        editMission(editingMissionId, mission);
    } else {
        addMission(mission);
    }

    missionForm.reset();
    editingMissionId = null;
    closeMissionModal();
});

// --- Ã‰DITION ---
function addMission(newMission) {
  // TODO: Ajouter une nouvelle mission Ã  la liste
  // VÃ©rifie les champs avec une validation de base avant lâ€™ajout
  // Mets Ã  jour lâ€™affichage
  missions.push(newMission);
  missions = orderList(missions);
  createMissionList(missions);
}

// --- Modification ---
const editBtn = listItem.querySelector(".edit-btn");
editBtn.addEventListener("click", () => {
    openEditModal(mission.id);
});

function openEditModal(id) {
    const m = missions.find(m => m.id === id);
    if (!m) return;

    editingMissionId = id;

    document.getElementById("modalTitle").textContent = "Edit Mission";

    document.getElementById("missionName").value = m.name;
    document.getElementById("missionAgency").value = m.agency;
    document.getElementById("missionObjective").value = m.objective;
    document.getElementById("missionDate").value = m.launchDate;
    document.getElementById("missionImage").value = m.image;

    missionModal.style.display = "flex";
}

function editMission(id, updatedData) {
  // TODO: Trouver la mission correspondante et modifier ses donnÃ©es
  // Mets Ã  jour lâ€™affichage
    missions = missions.map(m => m.id === id ? updatedData  : m);
    missions = orderList(missions);
    createMissionList(missions);
}

// --- SUPPRESSION ---
const deleteBtn = listItem.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this mission?")) {
        deleteMission(mission.id);
    }});

function deleteMission(id) {
  // TODO: Supprimer une mission aprÃ¨s confirmation (window.confirm)
  // Mets Ã  jour lâ€™affichage
    missions = missions.filter(m => m.id !== id);
    favorites = favorites.filter(f => f !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    createMissionList(missions);
}

// ===============================
// 6. VALIDATION DE FORMULAIRE
// ===============================
function validateForm(data) {
  // TODO: VÃ©rifier que tous les champs obligatoires sont remplis
  // BONUS : Utiliser Regex pour valider les emails et formats de dates
  // Retourne true ou false
    if (!confirm("Are you sure you want to delete this mission?")) return;

    missions = missions.filter(m => m.id !== id);
    favorites = favorites.filter(f => f !== id); // Retirer des favoris si nécessaire

    localStorage.setItem("favorites", JSON.stringify(favorites));

    createMissionList(missions);
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
