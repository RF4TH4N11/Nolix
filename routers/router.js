const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

router.get('/', Controller.test);
router.get('/userProfile', Controller.readUserProfile);
router.get('/movie', Controller.readMovies);
router.get('/favorite', Controller.readFavorites);
router.get('/category', Controller.readCategories);
router.post('/adminPage', Controller.test);

module.exports = router;