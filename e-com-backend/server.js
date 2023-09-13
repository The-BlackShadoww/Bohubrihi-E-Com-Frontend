require("dotenv/config");
const mongoose = require("mongoose");
const app =require('./app')

mongoose
    .connect(process.env.MONGODB_URL_LOCAL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection Failed!"))

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Backend App running on port ${port}`);
})