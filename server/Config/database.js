const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const MONGO_URI = "mongodb+srv://krish_durole:2Qj82o3XrpKotcJK@cluster0.qmv0wcd.mongodb.net/FlipKart?retryWrites=true&w=majority";
// const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;