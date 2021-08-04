const config = require("config");
const usersRoute = require("./routes/api_routes");
const express = require("express");

const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/public', express.static('public'))
//use users route for api/users
app.use("/api", usersRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
