## MODIFIED Requirements

### Requirement: Règles de sécurité versionnées
Les règles de sécurité de la base Firebase SHALL être versionnées dans le dépôt (`database.rules.json`), limitées à la branche `skillMatrix` d'un projet Firebase propre à la matrice (`matrice-competences-vleroy`), tout le reste de la base étant fermé. Pour la matrice, elles MUST : n'autoriser que les personnes connectées ; refuser la lecture de la liste des équipes à quiconque n'est pas inscrit dans `skillMatrix/admins`, tout en autorisant la lecture d'une équipe par son identifiant ; interdire toute écriture dans `skillMatrix/admins` ; réserver la création, la mise à la corbeille et le rétablissement d'une équipe aux administrateurs, le renommage d'une équipe active restant ouvert à tous ; n'accepter que des équipes, compétences, personnes, niveaux (entiers de 0 à 3) et envies (`noProgress` à vrai) bien formés, des cibles de 0 à 3, une échelle égale à 2 et une date de mise à la corbeille égale à l'heure du serveur ; n'accepter pour les anciennes notes (`ratings`) que leur effacement ; n'autoriser la suppression définitive d'une équipe, d'une personne ou d'une compétence que si elle est à la corbeille depuis plus de 90 jours, ou à un administrateur ; refuser toute autre donnée.

#### Scenario: Niveau hors échelle
- **WHEN** un navigateur tente d'écrire le niveau 4
- **THEN** la base refuse l'écriture

#### Scenario: Lister les équipes sans être administrateur
- **WHEN** un navigateur connecté anonymement lit `skillMatrix/teams`
- **THEN** la base refuse la lecture

#### Scenario: Se déclarer administrateur
- **WHEN** un navigateur tente d'écrire dans `skillMatrix/admins`
- **THEN** la base refuse l'écriture

#### Scenario: Créer une équipe sans être administrateur
- **WHEN** un navigateur connecté anonymement écrit une nouvelle fiche dans `skillMatrix/teams`
- **THEN** la base refuse l'écriture

#### Scenario: Mettre une équipe à la corbeille sans être administrateur
- **WHEN** un navigateur connecté anonymement écrit `deletedAt` sur une équipe
- **THEN** la base refuse l'écriture, alors qu'il peut toujours renommer l'équipe

## ADDED Requirements

### Requirement: Déploiement automatique des règles
À chaque push sur `main`, après la réussite des tests, GitHub Actions SHALL publier `database.rules.json` dans le projet Firebase de la matrice, avec un compte de service gardé en secret (`FIREBASE_SERVICE_ACCOUNT`), puis seulement publier le site. Si un test échoue, les règles MUST NOT être publiées. Sans secret, le déploiement des règles SHALL être sauté avec un avertissement, sans empêcher la publication du site.

#### Scenario: Règles modifiées
- **GIVEN** un push sur `main` qui modifie `database.rules.json` et dont les tests réussissent
- **WHEN** le workflow s'exécute
- **THEN** les nouvelles règles sont actives dans le projet de la matrice, sans action dans la console

#### Scenario: Fichier commun recopié par erreur
- **GIVEN** un `database.rules.json` qui contient aussi la branche d'un autre outil
- **WHEN** les tests s'exécutent
- **THEN** un test échoue et ni les règles ni le site ne sont publiés
