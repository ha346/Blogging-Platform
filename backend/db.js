const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&tls=false&directConnection=true"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongo successfully")
    })
}

module.exports = connectToMongo;