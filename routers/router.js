const express = require('express');
const router = express.Router()
const Controller = require('../controllers/controller');

router.get('/', Controller.test);
router.get('/userProfile', Controller.test);
router.get('/moviePage', Controller.test);
router.get('/movieFavorite', Controller.test);
router.get('/categoryPage', Controller.test);
router.post('/adminPage', Controller.test);

module.exports = router;