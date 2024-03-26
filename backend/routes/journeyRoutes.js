const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const { createJourney, getAllJourneys, removeJourney } = require('../controllers/journeyController')

router.post('/addJourney', protect ,createJourney);

router.get('/journeys', getAllJourneys);

router.delete('/removeJourney/:utId', protect, removeJourney)

module.exports = router;