const User = require('../models/UserModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', email, password);

    try {
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user);
            if (user.password === password) {
                console.log('Password match');
                res.json({ success: true });
            } else {
                console.log('Password mismatch');
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            console.log('User not found');
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { loginUser };
