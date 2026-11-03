## Why

La matrice de compétences partage aujourd'hui le projet Firebase `poker-planning-vleroy` avec d'autres outils. Sur l'offre gratuite (Spark), une Realtime Database accepte au plus 100 connexions simultanées, réparties entre tous ces outils, et le fichier de règles commun doit être recopié dans chaque dépôt ; une erreur dans la branche d'un outil peut casser les autres. Quatrième outil déplacé, sur le modèle de Fournée, de « Rôles et responsabilités » et des « Événements Scrum ».

## What Changes

- **Projet Firebase dédié** (`matrice-competences-vleroy` : Realtime Database en europe-west1, connexions **anonyme et Google**, domaine `agileroy.github.io` autorisé), créé par l'auteur ; `site/js/firebase-config.js` pointe vers ce projet.
- **Règles propres à la matrice** : `database.rules.json` ne contient plus que la branche `skillMatrix` (inchangée).
- **Déploiement automatique des règles** à chaque push sur `main`, après les tests (secret `FIREBASE_SERVICE_ACCOUNT`), puis publication du site.
- **Administrateur réinscrit** : l'identifiant Firebase change d'un projet à l'autre ; l'auteur se connecte sur `admin.html` et s'inscrit dans `skillMatrix/admins` du nouveau projet, depuis la console.
- **Projet partagé** : la branche `skillMatrix` est retirée du fichier commun, publié automatiquement par `poker-planning`.

**Pas de migration des données** : les équipes existantes ne sont que des essais (décision de l'auteur) ; la matrice repart vide dans le nouveau projet.

Hors périmètre : autres outils, offre payante.

## Capabilities

### New Capabilities

_Aucune._

### Modified Capabilities

- `site-publication` : règles d'un projet dédié, déployées automatiquement ; mise en service avec réinscription de l'administrateur.

## Impact

- Ce dépôt : `site/js/firebase-config.js`, `database.rules.json`, `firebase.json` et `.firebaserc` (nouveaux), `.github/workflows/pages.yml`, `tests/rules.test.mjs` (nouveau), `README.md`, `openspec/config.yaml`.
- Dépôts qui partagent encore la base (`poker-planning`, `wheel-of-chance`, `moving-motivators`, `roti`) : branche `skillMatrix` retirée de `database.rules.json`.
- Actions manuelles de l'auteur : créer le projet (base, connexions anonyme et Google activées, domaine autorisé, appli Web), créer le secret, puis s'inscrire administrateur dans le nouveau projet.
