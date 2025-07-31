// middlewares/auth.js
const { User } = require('../models')
const jwt = require('jsonwebtoken');
const SECRET = 'RAHASIA';

async function auth(req, res, next) {
    try {
        const token = req.session.userToken
        if (!token) return res.redirect('/login')

        const decoded = jwt.verify(token, SECRET)
        const user = await User.findByPk(decoded.id)
        if (!user) return res.redirect('/login')

        req.user = user
        next()
    } catch (err) {
        res.redirect('/login')
    }
}

function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(666).send('Access denied')
    }
    next()
}

module.exports = { auth, adminOnly }

