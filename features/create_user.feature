Feature: Création d'un utilisateur

  Scenario: Création d'un utilisateur avec un email déjà utilisé
    Given un utilisateur avec l'email "arsene@gmail.com" existe déjà
    When je soumets une demande de création d'utilisateur avec le nom "arsene", le prénom "Olembe", et l'email "arsene@gmail.com"
    Then je devrais recevoir un statut 400
    And je devrais voir un message "L'email est déjà utilisé."

  Scenario: Création d'un nouvel utilisateur avec des informations valides
    When je soumets une demande de création d'utilisateur avec le nom "arsene", le prénom "Olembe", et l'email "arsene@gmail.com"
    Then je devrais recevoir un statut 201
    And je devrais voir un utilisateur créé avec le nom "arsene" et le prénom "Olembe"