🚀 Space Odyssey Interactive — JavaScript Edition

Bienvenue dans la version interactive du site Space Odyssey.
Après avoir intégré le design en HTML/CSS, j’ai ajouté une couche complète d’interactivité en JavaScript, incluant recherche dynamique, CRUD, favoris et validation.

🌟 Fonctionnalités Réalisées
✅ 1. Validation de Formulaire

📝 Formulaire dynamique et entièrement contrôlé :

✔ Prénom & Nom : lettres uniquement

✔ Email : commence par une lettre + finit par @gmail.com

✔ Téléphone : format numérique

✔ Message obligatoire

❗ Affichage automatique d’un message en rouge si invalide

✅ Bordure verte si champ valide

🔍 2. Recherche en Temps Réel

Filtrage instantané des missions par :
✅ Nom
✅ Agence
✅ Objectif
✅ Date
✅ ID

Aucun rechargement, DOM mis à jour en direct.

🎛️ 3. Filtres Avancés

Filtre par agence (NASA, ESA, etc.)

Filtre par année

Filtre par type de mission

✅ Filtres + recherche combinés

🛠️ 4. CRUD Complet sur les Missions

✚ Ajouter une mission via un modal
✎ Modifier une mission existante
🗑 Supprimer une mission (avec confirmation)
📄 Afficher dynamiquement toutes les cartes dans le DOM

⭐ 5. Système de Favoris (localStorage)

Clic sur l’étoile → ajoute/enlève un favori

Étoile jaune si favori

Onglet Favoris dédié

🔄 Favoris conservés même après rafraîchissement

🧩 6. Gestion des Événements + UI Dynamique

Changement d’onglets (All / Favorites / My Missions)

Menus contextuels (3 points → Modifier / Supprimer)

Ouverture/fermeture du modal

Recherche + filtres en direct

🧬 Technologies Utilisées
Technologie	Rôle
HTML5	Structure du site
CSS3	Styling, responsive design
JavaScript (ES6)	DOM, events, CRUD, localStorage
JSON	Données des missions
localStorage	Sauvegarde des favoris
Git / GitHub	Versioning & hébergement

📁 Structure du Projet
/space-odyssey
│── index.html
│── contact.html
│── tech.html
│── style.css
│── missions.css
│── scripts.js
│── contact-validation.js
│── missions.json
│── README.md

🎯 Objectif du Projet

Transformer un site statique en application interactive

Manipuler le DOM, les événements, les tableaux

Effectuer des opérations CRUD en JavaScript pur

Sauvegarder les données avec localStorage

Créer une expérience utilisateur fluide et moderne

✅ Résultat Final

✨ Un site fonctionnel, réactif, interactif, avec :
✅ Formulaire intelligent
✅ Missions dynamiques
✅ Favoris persistants
✅ Filtres combinés
✅ CRUD complet
✅ UX fluide sans rechargement de page