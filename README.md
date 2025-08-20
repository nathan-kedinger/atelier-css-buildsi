# Contribuer au Projet

Merci de votre intérêt pour la contribution à ce projet pédagogique ! Ce document décrit les étapes pour
configurer l'environnement de développement et les bonnes pratiques pour contribuer efficacement.

## 🛠 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Git](https://git-scm.com/)
- [Docker & Docker Compose](https://www.docker.com/)
- Un éditeur de code comme [VS Code](https://code.visualstudio.com/) ou [PHPStorm](https://www.jetbrains.com/phpstorm/)

## 🚀 Mise en place de l'environnement

1. **Cloner le dépôt**

   ```bash
   git clone git@gitlab.tech.orange:peri-si/atelier-css-buildsi.git
   cd atelier-css-buildsi
   ```

2. **Lancer l'application avec Docker**

   ```bash
   docker-compose up --build
   ```

3. **Vérifier que l'application fonctionne** 🚀

   L'application devrait maintenant être accessible et fonctionnelle à l'adresse :
   ```bash
   http://localhost:5111
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