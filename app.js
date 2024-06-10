const express       = require("express");
const path          = require("path");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const passport      = require("passport");
const mongoose      = require("mongoose");

const config        = require("./config/database.js");
const users         = require("./routes/users");


// Connecting to MongoDB database
mongoose.connect(config.database);
mongoose.connection.on("connected", () => console.log(`Connected to the following database: ${config.database}.`));
mongoose.connection.on("error", (err) => console.log(`Database error: ${err}.`))


const PORT_NUMBER = 3000 
const app = express();

app.use(cors());    // CORS Middleware
app.use(bodyParser.json())  // BodyParser Middleware

// Setting static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);

app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

app.listen(PORT_NUMBER, () => console.log(`Server started on port ${PORT_NUMBER}.`));
