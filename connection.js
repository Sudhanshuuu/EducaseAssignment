const mongoose = require("mongoose");

async function connectMongoDb(link) {
    return mongoose.connect(link, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

}

module.exports = connectMongoDb;