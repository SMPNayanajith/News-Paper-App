const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reader = mongoose.model('Reader');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const AuthUser = mongoose.model('AuthUser');

require('dotenv').config();

// Routing using async/await

router.post('/add-new-reader', async (req, res) => {
    try {
        console.log('Data sent from client - ', req.body);
        const { firstName, lastName, password, email } = req.body;

        // Check if the email already exists
        const existsReader = await Reader.findOne({ email });
        if (existsReader) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const reader = new Reader({
            firstName,
            lastName,
            password: hashedPassword,
            email
        });
        await reader.save();

        const authUser = new AuthUser({
            userID: reader._id, // Use the Reader's _id as the userID
            roleType: "reader",
            reader: reader._id
        });
        await authUser.save();

        res.send({ message: 'Reader registered successfully' });
    } catch (error) {
        console.log('Database error', error);
        return res.status(422).send({ error: error.message });
    }
});
 
module.exports = router;
