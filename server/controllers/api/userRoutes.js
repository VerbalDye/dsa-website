const router = require('express').Router();
const { User, Session } = require('../../models');
const { withAuth, withAdminAuth } = require('../../utils/auth');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// GET /api/users
router.get('/', withAuth, withAdminAuth, (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/admin', (req, res) => {
    if (req.cookies["session_token"]) {
        Session.findOne({
            where: {
                session_token: req.cookies["session_token"]
            },
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }]
        })
            .then(dbSessionData => {
                res.status(200).json({ admin: dbSessionData.user.role == "admin" })
            })
    } else {
        res.status(200).json({ admin: false });
    }
})

router.get('/:id', withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            user_id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, withAdminAuth, (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
        .then(dbUserData => {
            const { password: trash, ...user } = dbUserData.dataValues;
            res.json({ user: user, message: 'User created.' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(401).json({ message: 'Incorrect Credentials' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect Credentials' });
            return;
        }

        Session.destroy({
            where: {
                user_id: dbUserData.user_id
            }
        }).then(dbDestroySessionData => {
            const { password: trash, ...user } = dbUserData.dataValues;
            const expiresAt = dayjs.utc().add(8, 'hour').toDate();
            console.log(expiresAt);
            Session.create({
                user_id: dbUserData.user_id,
                expires_at: expiresAt
            }).then(dbSessionData => {
                res.cookie("session_token", dbSessionData.session_token, { expires: expiresAt })
                res.json({ user: user, message: 'You are now logged in!' });
            })
        })
    })
})

router.post('/logout', withAuth, (req, res) => {
    if (req.cookies["session_token"]) {
        Session.destroy({
            where: {
                session_token: req.cookies["session_token"]
            }
        }).then(dbSessionData => {
            res.clearCookie("session_token");
            if (!dbSessionData) {
                res.status(404).json({ message: 'Session not found' });
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(404).end();
    }
})

router.put('/:id', withAuth, withAdminAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            user_id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, withAdminAuth, (req, res) => {
    User.destroy({
        where: {
            user_id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;