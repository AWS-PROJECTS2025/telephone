// Références aux éléments HTML
const form = document.getElementById('form-smartphone');
const tableBody = document.querySelector('#table-smartphones tbody');
const detailsDiv = document.getElementById('details-smartphone');

// Tableau pour stocker les smartphones en mémoire
let smartphones = [];

// Charger les smartphones depuis le localStorage au démarrage
function chargerSmartphones() {
    const smartphonesStorage = localStorage.getItem('smartphones');
    if (smartphonesStorage) {
        smartphones = JSON.parse(smartphonesStorage);
        smartphones.forEach(s => creerSmartphone(s.id, s.nom, s.prix));
    }
}

// Sauvegarder les smartphones dans le localStorage
function sauvegarderSmartphones() {
    localStorage.setItem('smartphones', JSON.stringify(smartphones));
}

// Fonction pour créer un nœud HTML pour un smartphone
function creerSmartphone(id, nom, prix) {
    const row = document.createElement('tr');
    row.classList.add('hover:bg-gray-100'); // Ajout d'un effet de survol
    row.innerHTML = `
        <td class="p-2 border-b">${id}</td>
        <td class="p-2 border-b">${nom}</td>
        <td class="p-2 border-b">${prix} CFA</td>
        <td class="p-2 border-b">
            <button onclick="detaillerSmartphone(${id})" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">Détails</button>
            <button onclick="supprimerSmartphone(${id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Supprimer</button>
        </td>
    `;
    tableBody.prepend(row);
}

// Fonction pour ajouter un nouveau smartphone
function ajouterSmartphone(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prix = parseFloat(document.getElementById('prix').value);
    const id = smartphones.length + 1;

    const smartphone = { id, nom, prix };
    smartphones.push(smartphone);
    creerSmartphone(id, nom, prix);
    form.reset();

    sauvegarderSmartphones(); // Sauvegarder dans le localStorage
}

// Fonction pour afficher les détails d'un smartphone
function detaillerSmartphone(id) {
    const smartphone = smartphones.find(s => s.id === id);
    detailsDiv.innerHTML = `
        <h3 class="text-lg font-bold">Détails du smartphone</h3>
        <p><strong>ID:</strong> ${smartphone.id}</p>
        <p><strong>Nom:</strong> ${smartphone.nom}</p>
        <p><strong>Prix:</strong> ${smartphone.prix} CFA</p>
    `;
}

// Fonction pour supprimer un smartphone
function supprimerSmartphone(id) {
    smartphones = smartphones.filter(s => s.id !== id);
    rafraichirTableau();
    sauvegarderSmartphones(); // Sauvegarder dans le localStorage
}

// Fonction pour rafraîchir le tableau
function rafraichirTableau() {
    tableBody.innerHTML = '';
    smartphones.forEach(s => creerSmartphone(s.id, s.nom, s.prix));
}

// Écouteurs d'événements
form.addEventListener('submit', ajouterSmartphone);
window.addEventListener('load', chargerSmartphones); // Charger les smartphones au démarrage