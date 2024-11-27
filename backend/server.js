require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts.js');
const loginRoutes = require('./routes/login.js');  // Import login route
const orderRoutes = require('./routes/orders');
const itemRoutes = require('./routes/items');  // Add the item routes
const categoryRoutes = require('./routes/category');

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/login', loginRoutes);  // Add login route
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);  // Add items route
app.use('/api/transactions', require('./routes/transaction'));
app.use('/api/categories', categoryRoutes);

// connect to MongoDB using the connection string in .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Database connection error:', err);
    });
    app.put('/api/items/update/:id', async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
    
        try {
            const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: 'Error updating item', error });
        }
    });
    

// start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
