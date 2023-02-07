const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongouri = "mongodb+srv://krish_durole:2Qj82o3XrpKotcJK@cluster0.qmv0wcd.mongodb.net/Ecommerce?retryWrites=true&w=majority"
const connectToMongo = ()=>{
    mongoose.connect(mongouri,{
        useNewUrlParser:true,
        useUnifiedTopology :true
    }).then(con=>{
        console.log(`MongoDB Database Connected with Host:${con.connection.host}`)
    })
}
module.exports = connectToMongo;