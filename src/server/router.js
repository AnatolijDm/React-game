const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult, buildCheckFunction} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./users');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'The password have to be 6 symbols length')
        .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('Body', req.body)
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data'
            })
        };

        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            res.status(400).json({ message: 'The user is already exist'})
        };

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'The user created'});


    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
});

router.post(
    '/login',
    [
        check('email', 'wrong email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong login/password'
            })
        };

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'The user is not exist'})
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'The password is wrong. Please try again'})
        };

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id});
    
    } catch (e) {
        res.status(500).json({ message: "Something went wrong, try again" })
    }
});

module.exports = router;