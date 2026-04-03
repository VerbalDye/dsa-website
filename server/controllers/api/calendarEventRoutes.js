const router = require('express').Router();
const sequelize = require('../../config/connection');
const { CalendarEvent } = require('../../models');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

router.get('/', (req, res) => {
    let start_search = req.body.start_date;
    let end_search = req.body.end_date;
    CalendarEvent.findAll({
        where: {
            [Op.or]: [
                {start_date: {
                    [Op.lt]: end_search,
                }},
                {end_date: {
                    [Op.gt]: start_search
                }}
            ]
        }
    })
});

router.get('/:id', (req, res) => {
    CalendarEvent.findOne({
        where: {
            calendar_event_id: req.params.id
        }
    })
        .then(dbCalendarEventData => res.json(dbCalendarEventData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

module.exports = router;