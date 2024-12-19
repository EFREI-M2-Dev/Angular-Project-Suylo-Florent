# Projet Angular Final

## Description
Projet réalisé par : 
- Louis LUBINEAU - [@Suylo](https://github.com/Suylo)
- Florent PARIS - [@FlorentParis](https://github.com/FlorentParis)

Ce projet est un site e-commerce de vente de figurines.

![First view](src/assets/img.png)

## Installation

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) version 16.2.15.

- Installer les dépendances : ```npm install```
- Lancer l'API : ```npm run api```
- Lancer le serveur : ```ng serve```


## Consignes du projet : 
- Faire un projet from scratch avec sujet libre ✅
- Les features Angular nécessaires :
  - **Une authentification**
    - Inscription / Connexion ✅ : ```/auth/login```, ```/auth/register```
  - **Routing** 
    - Au minimum 3 routes ✅ : ```/shop```, ```/account```, ```/cart```, ...
    - Dont au minimum une qui transmet une donnée à travers la route ✅ : ```/products/:id```
  - **Composant**
    - Au minimum un par page ✅
    - Au minimum un composant utilisé 2 fois ✅ : [```product-cart.component.ts```](src/app/shared/product-card/product-card.component.ts)
    - Au minimum 1 Input ✅ : [```item-cart.component.ts```](src/app/features/cart/item-cart/item-cart.component.ts)
    - Au minimum 1 Output ✅ : [```item-cart.component.ts```](src/app/features/cart/item-cart/item-cart.component.ts)
  - **Service** 
    - Au minimum 2 HTTP ✅ : [```product.service.ts```](src/app/core/services/product.service.ts), [```cart.service.ts```](src/app/core/services/cart.service.ts)
    - Communication avec un backend (json-server ou autre) ✅ : [```db.json```](db/db.json) 
    - Minimum 3 tables ✅ : ```products```, ```users```, ```cart```, ...
  - **Reactive Forms**
    - Minimum 3 FormControl ✅ : [```cart.component.ts```](src/app/features/cart/cart.component.ts)
    - Attention ce form est en plus des 2 pour l'authentification ✅
  - **Validator Custom**
    - Minimum 1 ✅ : [```cart-validator.ts```](src/app/features/cart/cart-validators.ts)
  - **Pipe Custom** 
    - Minimum 1  ✅ : [```product-info.pipe.ts```](src/app/shared/pipes/product-info.pipe.ts)
  - **Directive Custom**  
    - Minimum 1 ❌ : En cours

