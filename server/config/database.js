const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectDatabase = () => {
    const MONGO_URI = process.env.MONGOURI;
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;