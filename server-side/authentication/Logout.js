/*
    @Logout into store
*/

const express = require('express');
const app = express();

app.delete("/api/v1/logout", async (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
});

module.exports = app;