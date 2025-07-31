const { Category, Favorite, Movie, Profile, User } = require('../models/index')
const { Op } = require("sequelize")
class Controller {
    static async readUserProfile(req, res) {
        try {
            let profiles = await Profile.findAll({
                include: { User, Favorite, Category, Movie }
            })
            res.render('profiles', { profiles })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async readMovies(req, res) {
        try {
            let movies = await Movie.findAll()
            res.render('movies', { movies })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async readFavorites(req, res) {
        try {
            let favorites = await Favorite.findAll()
            res.render('favorites', { favorites })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async readCategories(req, res) {
        try {
            let categories = await Category.findAll()
            res.render('categories', { categories })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async deleteMovieById(req, res) {
        try {
            const { id } = req.params;

            let movies = await Movie.findByPk(+id);

            if (!movies) throw "Movie not found!"
            await Movie.destroy({
                where: {
                    id: +id
                }
            })
            res.redirect('/movie')
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async getAddMovies(req, res) {
        try {
            let movies = await Movie.findAll()
            res.render('movies', { movies })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async saveAddMovies(req, res) {
        try {
            const { title, year, released, director, actors, plot, imageUrl, rating, UserId, CategoryId } = req.body;
            await Movie.create({ title, year, released, director, actors, plot, imageUrl, rating, UserId, CategoryId })
            res.redirect('/movie')
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                const errors = err.errors.map(el => el.message);

                res.send(errors);
            } else {
                console.log(err);

                res.send(err);
            }
        }
    }
    static async getEditMovies(req, res) {
        try {
            const { id } = req.params;

            let movies = await Movie.findByPk(+id);

            if (!movies) throw "Movie not found!"
            res.render('editMovie', { movies })
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    static async saveEditMovies(req, res) {
        try {
            const { id } = req.params;
            const { title, year, released, director, actors, plot, imageUrl, rating, UserId, CategoryId } = req.body;
            await Movie.update({ title, year, released, director, actors, plot, imageUrl, rating, UserId, CategoryId }, {
                where: {
                    id: +id
                }
            })
            res.redirect('/moviePAge')
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                const errors = err.errors.map(el => el.message);

                res.send(errors);
            } else {
                console.log(err);

                res.send(err);
            }
        }
    }
    static async test(req, res) {
        try {
            res.render('homeTesting')
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    }
    
}
module.exports = Controller;