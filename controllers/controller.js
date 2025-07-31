const { User, Movie, Favorite, Category, Profile } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const SECRET = 'RAHASIA'

class Controller {
    static async showLanding(req, res) {
        try {
            res.render('landing');
        } catch (err) {
            res.send(err);
        }
    }


    static async showRegister(req, res) {
        try {
            res.render('register', {
                title: 'Register - Nolix21',
                bodyClass: 'bg-cover bg-center text-white'
            });

        } catch (err) {
            res.send(err)
        }
    }

    static async postRegister(req, res) {
        try {
            const { userName, email, password, role } = req.body

            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.render('register', { error: 'Email is already registered' });
            }

            await User.create({ userName, email, password, role })
            res.redirect('/login')
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showLogin(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(err)
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) return res.send('Email not found');

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return res.send('Invalid password');

            const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
            req.session.userToken = token;
            req.session.userId = user.id;

            console.log('Session after saving token:', req.session);
            res.redirect('/movies');
        } catch (err) {
            console.error('Login error:', err);
            // res.status(500).send('Internal Server Error');
        }
    }


    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.send(err);
                }
                res.redirect('/');
            });
        } catch (err) {
            res.send(err);
        }
    }

    static async listMovies(req, res) {
        try {
            const movies = await Movie.findAll({
                include: [
                    Category, User
                ]
            })

            res.render('movies', {
                user: req.user,
                movies
            })
        } catch (err) {
            res.send(err)
        }
    }

    static async movieDetail(req, res) {
        try {
            const id = req.params.id;
            const movie = await Movie.findByPk(id, {
                include: [
                    Category
                ]
            });
            res.render('movieDetail', { movie });
        } catch (err) {
            res.send(err)
        }
    }


    static async showFavoriteMovies(req, res) {
        try {
            const userId = req.session.userId;
            const user = await User.findByPk(userId, {
                include: {
                    model: Movie,
                    through: Favorite
                }
            });

            res.render('favorites', {
                user,
                movies: user.Movies
            });
        } catch (err) {
            res.send(err);
        }
    }

    static async addFavorite(req, res) {
        try {
            const userId = req.session.userId;
            const movieId = req.params.id;

            await Favorite.create({ UserId: userId, MovieId: movieId });

            res.redirect('/favorites');
        } catch (err) {
            res.send(err);
        }
    }
    static async removeFavorite(req, res) {
        try {
            const userId = req.session.userId;
            const movieId = req.params.id;

            await Favorite.destroy({
                where: {
                    UserId: userId,
                    MovieId: movieId
                }
            });

            res.redirect('/favorites');
        } catch (err) {
            res.send(err);
        }
    }
    static async showProfile(req, res) {
        try {
            const userId = req.session.userId;
            const user = await User.findByPk(userId, {
                include: Profile
            });

            res.render('profile', {
                user,
                profile: user.Profile
            });
        } catch (err) {
            res.send(err);
        }
    }


    static async saveProfile(req, res) {
        try {
            const userId = req.session.userId;
            const { firstName, lastName, phoneNumber } = req.body;

            const [profile, created] = await Profile.findOrCreate({
                where: {
                    UserId: userId
                },
                defaults: {
                    firstName, lastName, phoneNumber
                }
            });

            if (!created) {
                await profile.update({ firstName, lastName, phoneNumber });
            }

            res.redirect('/movies');
        } catch (err) {
            res.send(err);
        }
    }


    static async showAddMovie(req, res) {
        try {
            res.render('add-movie')
        } catch (err) {
            res.send(err)
        }
    }

    static async addMovie(req, res) {
        try {
            const { title, director, videoId } = req.body
            await Movie.create({ title, director, videoId })
            res.redirect('/movies')
        } catch (err) {
            res.send(err)
        }
    }

}

module.exports = Controller
