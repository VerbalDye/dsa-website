const { Session, User } = require('../models');

const withAuth = (req, res, next) => {
    const session_token = req.cookies["session_token"]
    if (!session_token) {
        res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl));
    } else {
        Session.findOne({
            where: {
                session_token: session_token
            }
        }).then(dbSessionData => {
            if (dbSessionData) {
                let expired = new Date(dbSessionData.expires_at) < new Date();
                if (!expired) {
                    next();
                } else {
                    Session.destroy({
                        where: {
                            user_id: dbSessionData.user_id
                        }
                    });
                    res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl));
                }
            } else {
                res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl));
            }
        })
    }
};

const withAdminAuth = (req, res, next) => {
    const session_token = req.cookies["session_token"]
    if (!session_token) {
        res.status(401).json({ message: 'No credentials identified. Try signing in.' });
    } else {
        Session.findOne({
            where: {
                session_token: session_token
            },
            include: [{
                model: User,
                attributes: { exclude: ['password'] },
            }]
        }).then(dbSessionData => {
            console.log(dbSessionData.user);
            if (dbSessionData) {
                if (dbSessionData.user.role == 'admin') {
                    next();
                } else {
                    res.status(403).json({ message: 'User does not have the correct access rights.'});
                }
            } else {
                res.status(401).json({ message: 'No credentials identified. Try signing in.' });
            }
        })
    }
}

module.exports = { withAuth, withAdminAuth };