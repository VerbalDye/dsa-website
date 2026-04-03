const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Session, User } = require('../../models');

router.get('/', (req, res) => {
    Session.findOne({
        where: {
            session_token: req.cookies.session_token
        },
        attributes: { exclude: ['session_key'] },
        include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }]
    })
        .then(dbSessionData => res.json(dbSessionData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;