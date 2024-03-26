const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const { joinJourney, getMyJourneys, getPassengers, leaveJourney } = require('../controllers/utazasController')

router.post('/joinJourney/:utId', protect, joinJourney);

router.get('/journeys', protect, getMyJourneys);
router.get('/utasok/:utazasId', getPassengers);

router.delete('/leaveJourney/:utId', protect, leaveJourney);

module.exports = router;