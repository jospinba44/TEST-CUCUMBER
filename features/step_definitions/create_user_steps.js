const { Given, When, Then, After } = require('@cucumber/cucumber');
const httpMocks = require('node-mocks-http');

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
    const req = httpMocks.createRequest({
        body: {
            NOM: nom,
            PRENOM: prenom,
            EMAIL: email
        }
    });
    const res = httpMocks.createResponse();

    await createUser(req, res);
    this.response = res;
});

Then('je devrais recevoir un statut {int}', function (status) {
    expect(this.response.statusCode).to.equal(status);
});

Then('je devrais voir un utilisateur créé avec le nom {string} et le prénom {string}', function (nom, prenom) {
    const utilisateur = JSON.parse(this.response._getData());
    expect(utilisateur.NOM).to.equal(nom);
    expect(utilisateur.PRENOM).to.equal(prenom);
});

Then('je devrais voir un message {string}', function (message) {
    const getvalue = this.response._getData();
    expect(JSON.parse(getvalue).message).to.equal(message); 
});

After(function () {
    query = originalQuery;
});