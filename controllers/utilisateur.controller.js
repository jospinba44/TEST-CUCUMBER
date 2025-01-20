const { query } = require("../utils/db");


//Requetes preparees
const createUser = async (req, res) => {
    try {
        const { NOM, PRENOM, EMAIL } = req.body;

        const existingUser =  await query('SELECT * FROM Utilisateur WHERE EMAIL = ?', [EMAIL])
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'L\'email est déjà utilisé.' });
        }

        const utilisateur = await query('INSERT INTO Utilisateur (NOM, PRENOM, EMAIL, MOT_DE_PASSE) VALUES (?, ?, ?, ?)', 
            [NOM, PRENOM, EMAIL, '12345678']);
        
        // Récupération de l'utilisateur créé pour la réponse
        const newUser = await query('SELECT * FROM Utilisateur WHERE ID_UTILISATEUR = ?', [utilisateur.insertId]);

        res.status(201).json(newUser[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};


module.exports = {
    createUser
}