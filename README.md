## 🏢 Gestion Spatiale du Personnel - Office Management System

Une application web intuitive pour la gestion spatiale du personnel dans un environnement de bureau. Visualisez et gérez l'affectation des employés selon les règles métier spécifiques.

## ✨ Fonctionnalités

## 🎯 Fonctionnalités Principales

**📊 Visualisation Spatiale**: Plan d'étage interactif avec 6 zones distinctes

**👥 Gestion des Employés**: Ajout, déplacement et suppression d'employés

**🎭 Restrictions Intelligentes** : Affectation selon les rôles et zones autorisées

**📱 Design Responsive** : Interface adaptée desktop, tablette et mobile

**👤 Profils Détaillés** : Vue complète des informations employés

##🏢 Zones de l'Application
**Salle de conférence** - Accès libre

**Réception** - Uniquement réceptionnistes

**Salle des serveurs** - Uniquement techniciens IT

**Salle de sécurité** - Uniquement agents de sécurité

**Salle du personnel** - Accès libre

**Salle d'archives** - Accès restreint

##🎨 Rôles et Permissions
**Rôle** =>	Zones Autorisées

**Manager**	=> Toutes zones

**Réceptionniste** =>	Réception + zones communes

**Technicien IT**	=> Salle serveurs + zones communes

**Agent de sécurité** =>	Salle sécurité + zones communes

**Nettoyage** =>	Toutes zones sauf archives

**Autres** =>	Zones communes


🛠️ Installation
Navigateur web moderne (Chrome, Firefox, Safari, Edge)

Connexion Internet (pour les CDN)




# Option 2: Ouvrir directement
open index.html
📋 Utilisation
Ajouter un Employé
Cliquez sur "Add New Worker" dans la sidebar

Remplissez le formulaire (nom, rôle, photo, email, téléphone, expériences)

La photo se prévisualise automatiquement

Validez pour ajouter à la liste "Unassigned Staff"

Affecter un Employé
Cliquez sur "+" dans une zone éligible

Sélectionnez un employé dans la liste des éligibles

L'employé apparaît dans la zone

Voir les Détails
Cliquez sur un employé pour voir son profil complet

Informations affichées : photo, rôle, contact, expériences, localisation

Déplacer/Supprimer
Bouton "X" sur un employé pour le retirer d'une zone

L'employé retourne dans "Unassigned Staff"

**🎨 Design System**
Palette de Couleurs
css
--primary-green: #4CAF50;    /* Actions principales */

--warning-orange: #FF9800;   /* Avertissements */

--danger-red: #F44336;       /* Suppressions */

--background: #F5F5F5;       /* Arrière-plan */

--surface: #FFFFFF;          /* Surfaces */

**Typographie**
Police principale : System fonts (Arial, Helvetica, sans-serif)


Hiérarchie : Utilisation cohérente des balises h1-h6

Breakpoints Responsive
css
### Desktop 

> 1280px : Grand écran
1024px - 1279px : Petit écran

### Tablet 
768px - 1023px : Mode portrait

1024px - 1279px : Mode paysage

### Mobile */
≤ 767px : Mode portrait
768px - 1023px : Mode paysage
📁 Structure du Projet
text
office-management-system/
│
├── index.html                 # Page principale

├── style.css                  # Styles CSS

├── script.js                  # Logique JavaScript

│

├── assets/

│   ├── images/               # Images et icônes

│   │   ├── default-avatar.png

│       └── zones/

│   

│

├── README.md                 # Ce fichier


## 🧪Validation Qualité##
✅ **HTML** : Validé avec W3C Validator

✅ **CSS** : Validé avec W3C CSS Validator

✅ **Accessibilité** : Respect des standards WCAG

✅ **Performance** : Optimisation des assets

✅ **Cross-browser** : Testé sur Chrome, Firefox, Safari, Edge

🚧 Fonctionnalités Bonus (Optionnelles)
**Drag & Drop** : Glisser-déposer des employés

**Édition** : Modifier les informations employés

**Recherche** : Filtrer par nom ou rôle

**Persistance** : Sauvegarde automatique (localStorage)

**Réorganisation auto** : Répartition aléatoire intelligente

**Photos par défaut** : Avatar par défaut si photo manquante




