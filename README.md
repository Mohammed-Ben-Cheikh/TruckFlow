# TruckFlow

## Description

TruckFlow est une application de suivi des trajets, carburant et maintenance pour flotte de camions. Elle permet de gérer efficacement les opérations liées à une flotte de camions, y compris le suivi des conducteurs, des trajets, de la maintenance, des pneus et des remorques.

## Architecture de l'application

L'application TruckFlow suit une architecture moderne basée sur les principes suivants :

### Architecture Globale

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                                TruckFlow Application                            │
├───────────────────────────────┬───────────────────────────────┬───────────────┤
│           Frontend             │           Backend              │    Database   │
│                               │                               │               │
│  ┌─────────────────────────┐  │  ┌─────────────────────────┐  │  ┌─────────┐  │
│  │ React + TypeScript       │  │  │ Node.js + Express        │  │  │ MongoDB │  │
│  │ - Vite                   │  │  │ - TypeScript             │  │  └─────────┘  │
│  │ - Redux Toolkit          │  │  │ - Mongoose               │  │               │
│  │ - Tailwind CSS           │  │  │ - JWT Authentication     │  │               │
│  └─────────────────────────┘  │  └─────────────────────────┘  │               │
│                               │                               │               │
└───────────────────────────────┴───────────────────────────────┴───────────────┘
```

### Structure du Projet

```
truckflow/
├── backend/                  # Backend Node.js/Express
│   ├── src/                  # Source code
│   │   ├── app.ts            # Configuration de l'application
│   │   ├── server.ts         # Point d'entrée du serveur
│   │   ├── app/
│   │   │   ├── Http/         # Contrôleurs et middlewares
│   │   │   ├── mailer/       # Service d'envoi d'emails
│   │   │   ├── models/       # Modèles MongoDB
│   │   │   ├── services/     # Services métier
│   │   ├── config/           # Configuration
│   │   ├── routes/           # Définition des routes
│   │   └── utils/            # Utilitaires
│   ├── test/                 # Tests unitaires
│   └── uploads/              # Fichiers uploadés
│
├── frontend/                 # Frontend React
│   ├── public/               # Fichiers statiques
│   ├── src/                  # Source code
│   │   ├── App.tsx           # Composant principal
│   │   ├── main.tsx          # Point d'entrée
│   │   ├── assets/           # Ressources statiques
│   │   ├── components/       # Composants réutilisables
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── page/             # Pages de l'application
│   │   ├── routes/           # Configuration des routes
│   │   ├── services/         # Services API
│   │   ├── stores/           # Gestion d'état (Redux)
│   │   └── utils/            # Utilitaires
│   └── ...
│
├── docker-compose.yml        # Configuration Docker
├── Dockerfile                # Construction de l'image Docker
├── package.json              # Dépendances globales
└── README.md                 # Documentation
```

### Flux de Données

```
1. L'utilisateur interagit avec l'interface React
2. Les requêtes API sont envoyées au backend via Axios
3. Le backend Express traite les requêtes
4. Les contrôleurs appellent les services métier
5. Les services interagissent avec les modèles MongoDB
6. Les réponses sont renvoyées au frontend
7. Redux Toolkit gère l'état global de l'application
```

## Guide d'installation et de configuration

### Prérequis

- Node.js (version 20 ou supérieure)
- Docker (pour l'environnement de développement)
- Docker Compose
- MongoDB (peut être exécuté via Docker)

### Installation

#### 1. Cloner le dépôt

```bash
git clone https://github.com/Mohammed-Ben-Cheikh/TruckFlow.git
cd TruckFlow
```

#### 2. Installer les dépendances

```bash
# Installer les dépendances globales
npm install

# Installer les dépendances du backend
npm run backend install

# Installer les dépendances du frontend
npm run frontend install
```

#### 3. Configurer l'environnement

Créer un fichier `.env` dans le dossier `backend` avec les variables suivantes :

```env
MONGO_URI=mongodb://localhost:27017/truckflow
JWT_SECRET=votre_secret_jwt_ici
PORT=3000
```

#### 4. Démarrer l'application

##### Option 1: Avec Docker (recommandé)

```bash
# Construire et démarrer les conteneurs
docker-compose up --build
```

L'application sera accessible à :

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

##### Option 2: Sans Docker

```bash
# Démarrer MongoDB localement ou via Docker
# Dans un terminal séparé, démarrer le backend
npm run backend run dev

# Dans un autre terminal, démarrer le frontend
npm run frontend run dev
```

### Configuration supplémentaire

- Pour modifier le port du frontend, éditer `frontend/vite.config.ts`
- Pour modifier la configuration de la base de données, éditer `backend/src/config/dbconfig.ts`
- Pour ajouter des variables d'environnement supplémentaires, les ajouter au fichier `.env`

## Dépendances externes

### Dépendances Backend

| Paquet            | Version | Rôle                                                |
| ----------------- | ------- | --------------------------------------------------- |
| bcryptjs          | ^3.0.3  | Hashage des mots de passe                           |
| cors              | ^2.8.5  | Middleware pour CORS                                |
| dotenv            | ^17.2.3 | Gestion des variables d'environnement               |
| express           | ^5.2.1  | Framework web pour Node.js                          |
| express-validator | ^7.3.1  | Validation des requêtes                             |
| jsonwebtoken      | ^9.0.3  | Génération et vérification des tokens JWT           |
| mongoose          | ^9.0.1  | ODM pour MongoDB                                    |
| morgan            | ^1.10.1 | Middleware de journalisation des requêtes HTTP      |
| multer            | ^2.0.2  | Middleware pour le traitement des fichiers uploadés |
| nodemailer        | ^7.0.11 | Envoi d'emails                                      |

### Dépendances Frontend

| Paquet           | Version | Rôle                                                       |
| ---------------- | ------- | ---------------------------------------------------------- |
| @reduxjs/toolkit | ^2.11.2 | Gestion d'état global                                      |
| react            | ^19.2.1 | Bibliothèque pour la construction d'interfaces utilisateur |
| react-dom        | ^19.2.0 | Intégration de React avec le DOM                           |
| react-redux      | ^9.2.0  | Intégration de Redux avec React                            |
| router-kit       | ^2.1.0  | Gestion des routes                                         |
| tailwindcss      | ^4.1.17 | Framework CSS utilitaire                                   |

### Dépendances de Développement

| Paquet       | Version | Rôle                                             |
| ------------ | ------- | ------------------------------------------------ |
| @types/\*    | \*      | Définitions de types TypeScript                  |
| concurrently | ^9.2.1  | Exécution simultanée de commandes                |
| eslint       | ^9.39.1 | Linter pour JavaScript/TypeScript                |
| jest         | ^29.7.0 | Framework de tests unitaires                     |
| supertest    | ^6.3.3  | Bibliothèque pour tester les API HTTP            |
| ts-jest      | ^29.1.0 | Intégration de Jest avec TypeScript              |
| ts-node-dev  | ^2.0.0  | Exécution du serveur TypeScript en développement |
| typescript   | ^5.9.3  | Compilateur TypeScript                           |
| vite         | ^7.2.4  | Outil de build pour le frontend                  |

## Scripts utiles

| Commande         | Description                                             |
| ---------------- | ------------------------------------------------------- |
| npm run dev      | Démarre le backend et le frontend en mode développement |
| npm run backend  | Exécute une commande dans le workspace backend          |
| npm run frontend | Exécute une commande dans le workspace frontend         |
| npm run docker   | Démarre les conteneurs Docker                           |
| npm run dbSh     | Ouvre un shell MongoDB dans le conteneur                |

## Environnement de Production

Pour déployer en production :

1. Construire les images Docker :

```bash
docker-compose build
```

2. Démarrer les conteneurs en mode détaché :

```bash
docker-compose up -d
```

3. Configurer les variables d'environnement pour la production dans `docker-compose.yml`

## Tests

Pour exécuter les tests :

```bash
# Tests backend
npm run backend run test

# Tests avec couverture
npm run backend run test:coverage
```

## Structure des Données

L'application utilise MongoDB avec les collections principales suivantes :

- Users : Informations sur les utilisateurs et authentification
- Trucks : Informations sur les camions
- Drivers : Informations sur les conducteurs
- Trailer : Informations sur les remorques
- Tire : Informations sur les pneus
- Maintenance : Historique de maintenance
- Tracking : Données de suivi des trajets
- Line : Informations sur les lignes de transport

## Bonnes Pratiques

- Utiliser TypeScript pour le typage fort
- Suivre les principes SOLID pour l'architecture
- Écrire des tests unitaires pour les fonctionnalités critiques
- Utiliser les hooks React pour la logique réutilisable
- Suivre les conventions de nommage consistantes
- Documenter les fonctions et composants complexes
