## 1. Préparation (auteur)

- [ ] 1.1 Créer le projet Firebase `matrice-competences-vleroy` : Realtime Database en europe-west1 (mode verrouillé), connexions anonyme **et Google** activées, `agileroy.github.io` dans les domaines autorisés, appli Web enregistrée. Vérification : configuration Web transmise, fournisseurs « Activé » dans la console.
- [x] 1.2 Créer le secret `FIREBASE_SERVICE_ACCOUNT` (clé JSON d'un compte de service du projet) dans le dépôt `matrice-competences`. Vérification : job `rules` réussi. Fait le 3 novembre 2026.

## 2. Dépôt

- [x] 2.1 Réduire `database.rules.json` à la branche `skillMatrix` (règles inchangées) et ajouter `tests/rules.test.mjs` (branche seule, pas d'écriture des administrateurs, `firebase.json` et `.firebaserc`). Vérification : `npm test` au vert.
- [x] 2.2 Ajouter `firebase.json`, `.firebaserc` et le job `rules` du workflow (après les tests, site publié après les règles, sauté avec avertissement sans secret). Vérification : règles « released successfully » dans le projet de la matrice.
- [x] 2.3 Pointer `site/js/firebase-config.js` vers le nouveau projet ; mettre à jour `README.md` (mise en service) et `openspec/config.yaml`. Vérification : page d'une équipe démo et `admin.html` ouverts sur le site publié, sans erreur. Fait le 3 novembre 2026 pour le déploiement ; l'administration attend la connexion Google (1.1, 2.4).
- [ ] 2.4 S'inscrire administrateur dans le nouveau projet (auteur) : connexion Google sur `admin.html`, puis `skillMatrix/admins/<identifiant>` à `true` dans la console. Vérification : la liste des équipes s'affiche dans l'administration.

## 3. Projet partagé

- [x] 3.1 Retirer la branche `skillMatrix` du fichier commun dans les dépôts qui partagent encore la base, lancer leurs tests, pousser. Vérification : fichiers identiques, tests au vert. Fait le 3 novembre 2026.
- [x] 3.2 Publier le fichier commun allégé (automatique, par `poker-planning`). Vérification : job `rules` réussi. Fait le 3 novembre 2026 (commit 80ce636).
