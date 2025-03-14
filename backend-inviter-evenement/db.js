const db = require('./dbconfig');

// Test de la connexion
db.query('SELECT 1')
    .then(() => {
        console.log('');
        console.log('#############################################################');
        console.log('####  Connexion réussie à la base de données MySQL 😎👌    #');
        console.log('#############################################################');
        console.log('');
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à la base de données 😖💔 :\n', err);
        throw err;
    });

module.exports = db;
