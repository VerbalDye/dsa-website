const express = require('express');
// const sequelize = require('./config/connection');
const path = require('path');
// const routes = require('./controllers');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'client/dist')));
// app.use(routes);

// sequelize.authenticate().then(() => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
        });
// });