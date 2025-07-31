const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { auth, adminOnly } = require('../middlewares/auth')

router.get('/', Controller.showLanding)
router.get('/register', Controller.showRegister)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.showLogin)
router.post('/login', Controller.postLogin)
router.post('/logout', Controller.logout)
router.get('/movies', auth, Controller.listMovies)
router.get('/profiles', auth, Controller.showProfile)
router.post('/profiles', auth, Controller.saveProfile)
router.get('/favorites', auth, Controller.showFavoriteMovies)
router.post('/admin/add-movie', auth, adminOnly, Controller.addMovie)
router.get('/admin/add-movie', auth, adminOnly, Controller.showAddMovie)

router.get('/movies/:id', auth, Controller.movieDetail)
router.post('/movies/:id/favorite', auth, Controller.addFavorite);
router.post('/favorites/remove/:id', auth, Controller.removeFavorite)

module.exports = router;