const express = require('express');
const router = express.Router();
const avisController = require('../controllers/AvisController');
const verifyjwt =require('../middleware/verifyJWT');


router.route('/Avis').post(verifyjwt,avisController.GiveAvis)
router.route('/Avis').get(avisController.getAvis)
router.route('/Avis/:id').delete(verifyjwt,avisController.deelete)




module.exports = router;