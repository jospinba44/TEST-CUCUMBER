const { Given, When, Then, After } = require('@cucumber/cucumber');
const httpMocks = require('node-mocks-http');
const axios = require('axios');

let chai;
let expect;

(async () => {
    chai = await import('chai');
    expect = chai.expect;
})();

const { createUser } = require('../../controllers/utilisateur.controller');
let { query } = require('../../utils/db');

let originalQuery;

Given('un utilisateur avec l\'email {string} existe déjà', async function (email) {
    originalQuery = query; 
    query = async (q, values) => {
        if (q.includes('SELECT * FROM Utilisateur WHERE EMAIL = ?')) {
            return [{ EMAIL: email }];
        }
        return [];
    };
});

When('je soumets une demande de création d\'utilisateur avec le nom {string}, le prénom {string}, et l\'email {string}', async function (nom, prenom, email) {
    try {
        response = await axios.post('http://localhost:3000/utilisateur/add_user', {
            NOM: nom,
            PRENOM: prenom,
            EMAIL: email
        });
    } catch (error) {
        response = error.response; // Pour récupérer la réponse d'erreur
    }
});

Then('je devrais recevoir un statut {int}', function (status) {
    expect(response.status).to.equal(status);
});

Then('je devrais voir un utilisateur créé avec le nom {string} et le prénom {string}', function (nom, prenom) {
    const utilisateur = response.data;
    console.log(utilisateur);
    
    expect(utilisateur.NOM).to.equal(nom);
    expect(utilisateur.PRENOM).to.equal(prenom);
});

Then('je devrais voir un message {string}', function (message) {
    expect(response.data.message).to.equal(message);
});

After(function () {
    query = originalQuery;
});