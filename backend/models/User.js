const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Function to add a new user
const addUser = async (email, password) => {
    try {
        // Create a new user instance
        const newUser = new User({
            email: email,
            password: password,
        });

        // Save the user to the database
        await newUser.save();
        console.log('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
    }
};
module.exports = User;
// Add the user
//addUser('admin@admin.com', 'admin');
