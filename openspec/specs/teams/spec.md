# Teams Specification

## Purpose
Équipes séparées, page d'accueil, création, renommage, partage par lien et QR code, corbeille des équipes.

## Requirements

### Requirement: Équipes séparées
Le site SHALL gérer plusieurs équipes, chacune avec ses propres personnes, compétences et notes. Chaque équipe SHALL avoir un identifiant aléatoire de 12 caractères (lettres minuscules et chiffres) et une adresse propre, `https://agileroy.github.io/matrice-competences/?equipe=<identifiant>`. Une équipe MUST NOT être lisible sans son identifiant, sauf par l'administrateur.

#### Scenario: Ouvrir une équipe par son lien
- **GIVEN** l'équipe « Paiement » d'identifiant `k7f3q2m9x1ab`
- **WHEN** Julie ouvre `?equipe=k7f3q2m9x1ab`
- **THEN** la matrice de l'équipe « Paiement » s'affiche, avec son nom en en-tête

#### Scenario: Identifiant inconnu
- **WHEN** quelqu'un ouvre `?equipe=` suivi d'un identifiant qui n'existe pas
- **THEN** la page indique « Équipe introuvable : vérifiez le lien » et propose de revenir à l'accueil

### Requirement: Page d'accueil
L'adresse de base SHALL afficher la page d'accueil : « Découvrir l'outil » avec « Essayer la démo », « Ouvrir avec un lien », et la liste des équipes déjà ouvertes sur ce navigateur (de la plus récemment visitée à la plus ancienne). Elle MUST NOT proposer de créer une équipe, et SHALL proposer d'écrire à l'administrateur pour en créer une, par un lien qui ouvre un e-mail prêt à envoyer. « Ouvrir avec un lien » SHALL accepter une adresse d'équipe complète ou un identifiant seul. Une équipe récente qui n'existe plus SHALL disparaître de la liste ; une équipe récente à la corbeille MUST NOT y apparaître.

#### Scenario: Première visite
- **GIVEN** un navigateur qui n'a jamais ouvert d'équipe
- **WHEN** Marc ouvre l'adresse de base
- **THEN** l'accueil affiche « Essayer la démo » et « Ouvrir avec un lien », sans liste ni bouton de création

#### Scenario: Équipes récentes
- **GIVEN** Marc qui a ouvert les équipes « Paiement » puis « Mobile »
- **WHEN** il revient sur l'accueil
- **THEN** « Mobile » apparaît avant « Paiement », et un clic ouvre l'équipe

### Requirement: Création et renommage d'une équipe
Seul un administrateur SHALL pouvoir créer une équipe, depuis l'administration, en saisissant son nom (1 à 50 caractères après retrait des espaces de bord). Le nom SHALL être modifiable par toute personne avec le bouton crayon de l'en-tête de l'équipe. Deux équipes MAY porter le même nom.

#### Scenario: Création refusée hors administration
- **WHEN** un navigateur non administrateur tente d'écrire une nouvelle équipe dans la base
- **THEN** la base refuse l'écriture

### Requirement: Partage par lien et QR code
La page de chaque équipe SHALL afficher en permanence une carte « Rejoindre l'équipe » avec le QR code menant au lien de l'équipe, l'adresse de l'équipe, et « Copier le lien », « Copier le QR code » et « Télécharger le QR code ». Un clic sur le QR code SHALL l'agrandir. « Copier le QR code » et « Télécharger le QR code » SHALL produire une image PNG du QR code, noir sur fond blanc avec sa marge de lecture, portant le nom de l'équipe en dessous. Si le navigateur refuse la copie d'une image, « Copier le QR code » SHALL télécharger l'image et le signaler. Le QR code SHALL être généré dans la page, sans service tiers.

#### Scenario: Rejoindre depuis un téléphone
- **GIVEN** la page de l'équipe « Paiement » affichée sur un ordinateur
- **WHEN** Marc scanne le QR code de la carte « Rejoindre l'équipe » avec son téléphone
- **THEN** son téléphone ouvre la matrice de l'équipe « Paiement »

#### Scenario: Coller le QR code dans un message
- **GIVEN** la page de l'équipe « Paiement »
- **WHEN** Vincent clique sur « Copier le QR code » puis colle dans un message
- **THEN** le message contient l'image du QR code avec « Paiement » écrit dessous, et cette image se scanne

### Requirement: Corbeille des équipes
Seul un administrateur SHALL pouvoir mettre une équipe à la corbeille, depuis l'administration (avec un second clic de confirmation) ; la page d'une équipe MUST NOT proposer de la supprimer. La mise à la corbeille SHALL conserver toutes les données de l'équipe. Son lien SHALL alors afficher « Cette équipe est dans la corbeille », la date de suppression, le nombre de jours avant suppression définitive et l'indication que seul l'administrateur peut la rétablir, sans la matrice. « Rétablir », dans l'administration, SHALL remettre l'équipe exactement dans son état d'avant la suppression. Une équipe à la corbeille depuis plus de 90 jours SHALL être supprimée définitivement, avec toutes ses données, à la prochaine visite de l'accueil d'un navigateur qui la connaît ou de l'administration. Les règles de sécurité MUST réserver la mise à la corbeille, le rétablissement et la suppression définitive anticipée d'une équipe à l'administrateur.

#### Scenario: Supprimer puis rétablir
- **GIVEN** l'équipe « Paiement » avec 5 personnes et leurs notes
- **WHEN** Vincent la met à la corbeille depuis l'administration, puis la rétablit
- **THEN** l'équipe réapparaît avec ses 5 personnes et toutes leurs notes

#### Scenario: Pas de suppression depuis la page de l'équipe
- **WHEN** Julie ouvre la page de l'équipe « Paiement »
- **THEN** aucun bouton ne permet de supprimer l'équipe

#### Scenario: Suppression définitive trop tôt
- **GIVEN** une équipe mise à la corbeille il y a 10 jours
- **WHEN** un navigateur non administrateur tente d'effacer ses données
- **THEN** la base refuse l'écriture

### Requirement: Équipe de démonstration
L'adresse `?equipe=demo` SHALL ouvrir une équipe fictive déjà remplie, qui montre une compétence couverte, une compétence couverte mais perdue si une personne s'absente, un back-up insuffisant, un référent insuffisant, des personnes qui ne souhaitent pas progresser et des cases non notées. Toutes les actions de la page d'une équipe SHALL y fonctionner, mais les données MUST rester dans le navigateur du visiteur, sans rien écrire dans la base ; elles SHALL être conservées d'une visite à l'autre sur ce navigateur et synchronisées entre ses onglets. À la place de « Rejoindre l'équipe », la page SHALL afficher une carte « Démo » indiquant que les essais ne sont visibles que dans ce navigateur, avec « Demander mon équipe » (e-mail prêt à envoyer à l'administrateur), « Recommencer la démo » (second clic de confirmation), qui remet l'équipe fictive de départ, et l'adresse de l'administrateur avec « Copier l'adresse ». La démo MUST NOT apparaître dans « Vos équipes ».

#### Scenario: Essayer sans gêner les autres
- **GIVEN** Julie et Marc qui ouvrent la démo, chacun sur son ordinateur
- **WHEN** Julie ajoute « Zoé » et la note en Kafka
- **THEN** Marc ne voit pas « Zoé », et Julie la retrouve en rouvrant la démo

#### Scenario: Recommencer
- **GIVEN** Julie qui a modifié la démo
- **WHEN** elle clique deux fois sur « Recommencer la démo »
- **THEN** l'équipe fictive de départ réapparaît, sans ses modifications

#### Scenario: Demander son équipe
- **WHEN** Julie clique sur « Demander mon équipe »
- **THEN** sa messagerie ouvre un e-mail à l'administrateur, avec l'objet et le message à compléter
