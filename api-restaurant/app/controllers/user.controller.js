const db = require('../db-config');
const util = require('util');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = {
    create: async (req, res, next) => {
        const { email, password, name } = req.body;
        console.log(req.body);
        let user = await User.findOne({
            where: {
            email: email
            },
        });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        user = new User({
            email, password, name
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ message: 'Sign Up success!'});
        res.status(200);        
    },

    auth: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            console.log(req.body);
            let user = await User.findOne({
                where: {
                    email: email
                },
            });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] })
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] })
            }            
            res.status(201);
            res.json({ message: 'Login success!', login: true });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    
    
}