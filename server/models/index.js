const CalendarEvent = require('./CalendarEvent');
const Session = require('./Session');
const User = require('./User');

// User-Session Associations
User.hasOne(Session, {
    foreignKey: 'user_id'
});
Session.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { 
    CalendarEvent,
    Session,
    User,
};