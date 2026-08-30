const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendmail');

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

// register new user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        //todos- hash the password before saving to the db
        //implement JWT generation for authentication
        // otp sending and verificaton for email confirmation
        // wlcome mail to user

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            const otp = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            const message = `welcome to shopnest, your otp for shopnest is :${otp}`;

            await sendEmail(
                email,
                'welcome to shopnest - your OTP for registration is',
                message
            );

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(500).json({
                message: 'server error'
            });
        }
    }
    catch (error) {
        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            message: 'server error'
        });
    }
};

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).json({
                message: 'Invalid email or password'
            });
        }
    }
    catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: 'server error'
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.json(users);
    }
    catch (error) {
        console.log("GET USERS ERROR:", error);

        res.status(500).json({
            message: 'server error'
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers
};