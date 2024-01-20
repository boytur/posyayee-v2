/*
    @Login into store
*/

const express = require('express');
const app = express();
const UserModel = require('../models/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.delete("/api/v1/logout", async (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
});

module.exports = app;