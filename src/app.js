const express = require('express')
require("dotenv").config();
const schoolRoutes = require("./routes/schoolRoutes");

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ success: true, message: "API is running" })
})

app.use("/", schoolRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
