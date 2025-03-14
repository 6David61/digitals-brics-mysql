const express = require('express');
const router = express.Router();
const evenementsInviterController = require('../controllers/evenementsInviterCon');

// Ajouter une nouvelle sous tache
router.post('/evenementsInviter', evenementsInviterController.create);

router.get('/evenementsInviter', evenementsInviterController.getAll);

router.get('/evenementsInviter/:idEvenement', evenementsInviterController.getByIdEvenement);

module.exports = router;