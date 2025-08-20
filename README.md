# Contribuer au Projet

Merci de votre intérêt pour la contribution à ce projet SaaS basé sur le RAG ! Ce document décrit les étapes pour
configurer l'environnement de développement et les bonnes pratiques pour contribuer efficacement.

## 🛠 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/)
- Un éditeur de code comme [VS Code](https://code.visualstudio.com/) ou [PHPStorm](https://www.jetbrains.com/phpstorm/)

## 🚀 Mise en place de l'environnement

1. **Cloner le dépôt**

   ```bash
   git clone nathan-kedinger/atelier-css-buildsi
   cd rag-out
   ```

2. **Configurer les variables d'environnement**

    - Récupérez le fichier `.env.local` sur GitHub ou auprès du responsable du projet.
    - Placez-le à la racine du projet.
    - Important : ne jamais committer ce fichier dans le dépôt Git !

3. **Lancer l'application avec Docker**

   ```bash
   docker-compose up --build
   ```

4. **Installer les dépendances Symfony** (uniquement à la première installation) :

   ```bash
   docker-compose exec -it backend bash
   composer install
   ```

5. **Exécuter les migrations de base de données** :

   ```bash
   symfony console d:m:m
   ```

6. **Charger les fixtures si nécessaire** :

   ```bash
   symfony console d:f:l
   ```

7. **Vérifier que l'application fonctionne** 🚀

   L'application devrait maintenant être accessible et fonctionnelle !

## $ Utilisation de de Stripe en local

Pour pouvoir tester la modification d'abonnement en local, il est nécessaire de lancer le webhook de sécurité via cette
commande :

   ```bash
    stripe listen --forward-to localhost:5003/api/webhook
  ```   

## 🔄 Processus de Contribution

1. **Créer une branche (Ne pas directement pousser sur main. La CI est jouée automatiquement et l'application est mise
   en production.**

   ```bash
   git checkout -b feature/nom-de-la-fonctionnalité
   ```

2. **Développer et tester votre fonctionnalité**

    - Suivez les conventions de code (PSR-12 pour PHP, linting pour JavaScript/TypeScript).
    - Ajoutez des tests unitaires et fonctionnels si nécessaire.

3. **Commiter vos changements**

   ```bash
   git commit -m "feat: description de la modification"
   ```

4. **Pousser votre branche**

   ```bash
   git push origin feature/nom-de-la-fonctionnalité
   ```

5. **Créer une Pull Request (PR)**

    - Ouvrez une PR sur GitHub.
    - Décrivez les modifications et leur impact.
    - Attendez la revue des autres contributeurs.

## 📜 Bonnes pratiques

- **Respectez les conventions de code** : PHP (PSR-12), Vue.js (Composition API).
- **Rédigez des commits clairs et concis**.
- **Ajoutez des tests** pour assurer la stabilité de l'application.
- **Documentez vos changements** dans le code et/ou le README si nécessaire.
- **Soyez respectueux et collaboratifs** lors des revues de code.

Merci pour votre contribution ! 🚀