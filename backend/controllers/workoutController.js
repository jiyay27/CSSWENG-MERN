const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET a single workout
const getAWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such item exists.'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such item exists.'})
    }
    
    res.status(200).json(workout) 
}


// CREATE new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a workout


// UPDATE a workout


modulu.exports = {
    getWorkouts,
    getAWorkout,
    createWorkout
}