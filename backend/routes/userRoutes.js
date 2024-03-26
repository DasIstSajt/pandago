const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

const { register, login, updateUser, getMyJourneys, getUsers } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

router.get('/myJourneys', protect, getMyJourneys);
router.get('/me', protect, getUsers);

module.exports = router;