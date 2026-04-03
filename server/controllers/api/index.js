const router = require('express').Router();
const { withAuth } = require('../../utils/auth');

const calendarEventRoutes = require('./calendarEventRoutes');
const sessionsRoutes = require('./sessionRoutes');
const userRoutes = require('./userRoutes');

router.use('/calendar', calendarEventRoutes);
router.use('/session', withAuth, sessionsRoutes);
router.use('/user', userRoutes);

module.exports = router;