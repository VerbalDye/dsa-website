const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Sequelize } = require("sequelize");

class Sessions extends Model {};

Sessions.init(
    {
        session_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        session_token: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'session',
        timestamps: false
    }
)

module.exports = Sessions;