const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gbvxg.mongodb.net/mern_project`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log("Failed to connect MongoDB", error))