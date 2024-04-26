const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
    try {
    const { email, password, name } = req.body;
    //console.log("Recieved:", email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    console.log(error.errorResponse.code);
    if(error.errorResponse.code === 11000){
        res.status(500).json({ error: 'User already exists.' });
    }else{
        res.status(500).json({ error: 'Registration failed' });
    }
    }
});
   
// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log("Recieved:", email, password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'SacSriAsh007@Sachu007', {
        expiresIn: '60s',
        });
        const name = user.name;
        userResponse = {token, email, name};
        console.log(userResponse);
        console.log("Logged in User:"+ email);
        res.status(200).json(userResponse);
    } catch (err) {
        console.log(err)
    res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;