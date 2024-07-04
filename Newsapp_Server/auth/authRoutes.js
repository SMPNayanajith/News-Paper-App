const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Reader = mongoose.model('Reader');
const AuthUser = mongoose.model('AuthUser');
const Reporter = mongoose.model('Reporter');

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

// Add new reporter
router.post('/add-new-reporter', async (req, res) => {
    try {
        console.log('Data sent by client side-', req.body);
        const { firstName, lastName, password, email, city, country, contactNumber } = req.body;

        // Check if the email already exists
        const existsReporter = await Reporter.findOne({ email });

        if (existsReporter) {
            return res.status(422).send({ error: "Email already exists" });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new reporter object
        const reporter = new Reporter({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            city,
            country,
            contactNumber
        });

        await reporter.save();

        const authUser = new AuthUser({
            userID: reporter._id, // Use the Reporter's _id as the userID
            roleType: "reporter",
            reporter: reporter._id
        });
        await authUser.save();
        res.send({ message: 'Reporter registered successfully' });

    } catch (error) {
        console.log("Database error", error);
        return res.status(422).send({ error: error.message });
    }
});

// Login router
router.post('/user-login', async (req, res) => {
    try {
        const { userID, password } = req.body;
        const authUser = await AuthUser.findOne({ userID });
        if (!authUser) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        let user;
        if(authUser.roleType==="reader")
            {
                user=await Reader.findById(authUser.reader);
            }else if(authUser.roleType==="reporter")
                {
                    user = await Reporter.findById(authUser.reporter);

                }
          //if no user found
        if(!user)
            {
                return res.status(401).json({ error: 'User not found' });
            }

        //if found user
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
            {
                return res.status(401).json({ error: 'Invalid password' });
            }
        const token =JWT.sign({userID:authUser._id,roleType:authUser.roleType},process.env.JWT_SECRET,{expiresIn:'10m'});
        const roleType = authUser.roleType;

        //return data
        res.json({token,roleType});
        console.log(`Logging as ${authUser.roleType}`);

        

        // const isPasswordValid = await bcrypt.compare(password, authUser.password);
        // if (!isPasswordValid) {
        //     return res.status(401).send({ error: 'Invalid password' });
        // }

        // const token = JWT.sign({ userID: authUser.userID }, process.env.JWT_SECRET, {
        //     expiresIn: '1h'
        // });

        res.send({ message: 'Login successful', token });
    } catch (error) {
        console.log('Database error', error);
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;
