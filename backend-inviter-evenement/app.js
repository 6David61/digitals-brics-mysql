const express = require("express");
const cors = require("cors");
const schedule = require("node-schedule");
const db = require("./db");
const xss = require("xss-clean");
require("dotenv").config();

// Import des routes
const evenementsInviterRoutes = require("./routes/evenementsInviterRou");

// Initialisation de l'application
const app = express();
app.use(express.json());
app.use(cors());
app.use(xss());

// Routes pour les différentes fonctionnalités de l'AP
app.use("/api", evenementsInviterRoutes);



//###### Planifier une tâche qui s'exécute tous les 8 jours
async function jobCleanActiveCodeDatabase() {
  console.log(
    "Nettoyage des codes de validation expirés. Heure actuelle :",
    new Date()
  );
  let connection;

  try {
    connection = await db.getConnection();

    // Supprimer les codes de validation expirés ou invalides
    const result = await connection.execute(`
            DELETE FROM Codes_Validation
            WHERE valide = 0 OR dateInscription < DATEADD(DAY, -30, GETDATE())
          `); // Supprime les codes invalides ou vieux de plus de 30 jours

    console.log(
      `${result.affectedRows} codes de validation supprimés avec succès.`
    );
  } catch (error) {
    console.error(
      "Erreur lors du nettoyage des codes de validation :",
      error.message
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}


//toutes les 8h
const job = schedule.scheduleJob("0 0 */8 * *", () => {
  // jobCleanActiveCodeDatabase();
});

module.exports = app;
