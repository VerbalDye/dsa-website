const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Sequelize } = require("sequelize");

class CalendarEvent extends Model {};

CalendarEvent.init(
    {
        calendar_event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        all_day: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: DataTypes.ENUM("dsa_event", "dsa_meeting", "friends_event", "friends_meeting"),
            allowNull: false
        },
        location_name: {
            type: DataTypes.STRING
        },
        location_address: {
            type: DataTypes.STRING
        },
        location_link: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'calendar_event',
        timestamps: false
    }
)

module.exports = CalendarEvent;