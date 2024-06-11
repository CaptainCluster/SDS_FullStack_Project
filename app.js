const express       = require("express");
const path          = require("path");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const passport      = require("passport");
const mongoose      = require("mongoose");
require("dotenv").config();

const config        = require("./config/database.js");
const users         = require("./routes/users");

// Connecting to MongoDB database
mongoose.connect(process.env.MONGODB);
mongoose.connection.on("connected", () => console.log("Successfully established a connection to a MongoDB cluster."));
mongoose.connection.on("error", (err) => console.log(`Database error: ${err}.`));

const PORT_NUMBER = process.env.PORT || 3000
const app = express();

// Including the middleware
app.use(cors());    
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport.js")(passport);

// Setting static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);

app.get("/", (req, res) => 
{
    res.send("Invalid Endpoint");
});

app.listen(PORT_NUMBER, () => console.log(`Server started on port ${PORT_NUMBER}.`));
