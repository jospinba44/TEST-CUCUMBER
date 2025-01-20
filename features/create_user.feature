Feature: Création d'un utilisateur

  Scenario: Création d'un utilisateur avec un email déjà utilisé
    Given un utilisateur avec l'email "arseneba@gmail.com" existe déjà
    When je soumets une demande de création d'utilisateur avec le nom "Arsene", le prénom "BA", et l'email "arseneba@gmail.com"
    Then je devrais recevoir un statut 400
    And je devrais voir un message "L'email est déjà utilisé."

  Scenario: Création d'un nouvel utilisateur avec des informations valides
    When je soumets une demande de création d'utilisateur avec le nom "Arsene", le prénom "BA", et l'email "arseneba@gmail.com"
    Then je devrais recevoir un statut 201
    And je devrais voir un utilisateur créé avec le nom "Arsene" et le prénom "BA"