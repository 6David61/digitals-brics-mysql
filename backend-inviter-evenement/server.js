const http = require("http"); // Importation du module http pour créer le serveur
const app = require("./app"); // Importation de l'application Express
require("dotenv").config();


// Fonction pour normaliser le port
const normalizePort = (val) => {
  const port = parseInt(val, 10); // Conversion de la valeur en entier

  if (isNaN(port)) {
    return val; // Si ce n'est pas un nombre, retourner la valeur telle quelle
  }
  if (port >= 0) {
    return port; // Si c'est un nombre positif, retourner ce nombre
  }
  return false; // Si c'est un nombre négatif, retourner false
};

// Détermination du port à utiliser, par défaut 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port); // Définition du port pour l'application

// Gestion des erreurs pour le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error; // Si l'erreur n'est pas liée à l'écoute du serveur, lever l'erreur
  }
  const address = server.address(); // Récupération de l'adresse du serveur
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port; // Définition de l'adresse ou du port en fonction de la nature de l'adresse
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges."); // Erreur de permission
      process.exit(1); // Sortie du processus avec un code d'erreur
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use."); // Erreur d'adresse déjà utilisée
      process.exit(1); // Sortie du processus avec un code d'erreur
      break;
    default:
      throw error; // Pour les autres types d'erreurs, lever l'erreur
  }
};

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

server.on("error", errorHandler); // Attacher le gestionnaire d'erreurs
server.on("listening", () => {
  const address = server.address(); // Récupération de l'adresse du serveur
  const bind = typeof address === "string" ? "pipe " + address : "port " + port; // Définition de l'adresse ou du port en fonction de la nature de l'adresse
  console.log("Listening on " + bind); // Log du message indiquant que le serveur écoute
});


server.listen(port); // Le serveur commence à écouter sur le port défini
