const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');


connectToMongo();
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());
 

// Available Routes
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// Available Routes -  CRUD Operation(Create,Read,Update,Delete)

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})