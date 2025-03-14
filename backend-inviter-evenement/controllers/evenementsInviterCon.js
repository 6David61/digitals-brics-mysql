const db = require("../db"); // Importer poolPromise
const { addEvenement_InviterValidation } = require("../utils/validationSchema");

exports.create = async (req, res) => {
  const { nom, prenom, email, email_secondaire, numero, numero_secondaire, societe, fonction, mailAutorisation, idEvenement, evenement } = req.body;
  const dateInscription = new Date();
  const creer_par = `${nom} ${prenom}`;

  let connection;
  try {

    // Validation des données d'entrée
    const { error } = addEvenement_InviterValidation({
      nom,
      prenom,
      email,
      numero,
      societe,
      fonction,
      idEvenement,
    });

    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message });
    }

    connection = await db.getConnection();

    // Vérifier l'existence de la demande
    const [confirmationVerif] = await connection.execute(
      `SELECT * FROM Evenements_Inviter WHERE email = ? AND idEvenement = ?`,
      [email, idEvenement]
    );

    if (confirmationVerif.length > 0) {
      return res.status(201).json({
        error: true,
        message: `M. ou Mme. ${prenom} ${nom}, votre présence à l'événement ${evenement} confirmée avec succès.`,
      });
    }

    // Insertion de l'invité dans la table Evenements_Inviter
    await connection.execute(
      `INSERT INTO Evenements_Inviter (nom, prenom, email, email_secondaire, numero, numero_secondaire, societe, fonction, mailAutorisation, idEvenement, dateInscription, evenement)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nom, prenom, email, email_secondaire || null, numero, numero_secondaire || null, societe, fonction, mailAutorisation ? 1 : 0, idEvenement, dateInscription, evenement]
    );

    console.log(`${creer_par} vient de s'enregistrer à l'événement ${idEvenement}, ${evenement} à ${dateInscription}`);

    res.status(201).json({ message: `M. ou Mme. ${prenom} ${nom}, votre présence à l'événement ${evenement} confirmée avec succès.` });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({
      error: true,
      message: "Erreur serveur lors de l'ajout de l'invité.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getAll = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute(`
      SELECT * FROM Evenements_Inviter
      ORDER BY dateInscription DESC
    `);

    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({
      error: true,
      message: "Erreur serveur lors de la récupération des invités.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getByIdEvenement = async (req, res) => {
  let connection;
  const { idEvenement } = req.params;
  try {
    connection = await db.getConnection();
    console.log(idEvenement)

    const [result] = await connection.execute(`
      SELECT * FROM Evenements_Inviter
        WHERE idEvenement = ?
        ORDER BY dateInscription DESC
      `, [idEvenement]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({
      error: true,
      message: "Erreur serveur lors de la récupération des invités de l'événement.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
